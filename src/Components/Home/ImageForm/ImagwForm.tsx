import { ChangeEvent, FC, useReducer } from 'react'
import { baseUrl } from '../../../Assets/data'
import MessageBar from '../../MessageBar/MessageBar';
import './ImageForm.scss'

const SET_INPUT = 'set_input';
const SET_IS_URL = 'set_is_url';
const SET_IS_IMAGE = 'set_is_image';
const SET_FACE_DATA = 'set_face_data';
const SET_HAS_INPUT = 'set_has_input';
const SET_ACTIVE_BOOLEAN = 'set_active_boolean';

type BOOLEANS = typeof SET_IS_URL | typeof SET_IS_IMAGE | typeof SET_HAS_INPUT;
interface FaceBox {
    leftCol: number;
    rightCol: number;
    topRow: number;
    bottomRow: number;
}

const ImageForm: FC = () => {
    const [state, dispatch] = useReducer(stateReducer, {
        input: '',
        isUrl: true,
        isImage: true,
        hasInput: true,
        faceData: null,
        activeBoolean: null
    });

    const calculateFaceBox = () => {
        const faces = state.faceData?.outputs[0].data.regions.map(region => region.region_info.bounding_box)
        if (!faces) return;

        const image = document.getElementById('image-form-imageBody')! as HTMLImageElement;
        const imageWidth = Number(image.width);
        const imageHeight = Number(image.height);
        console.log(imageWidth, imageHeight);

        console.log(faces.map(face => ({
            leftCol: face.left_col,
            rightCol: face.right_col,
            topRow: face.top_row,
            bottomRow: face.bottom_row
        })));

        const boxes: FaceBox[] = faces.map(face => ({
            leftCol: imageWidth * face.left_col,
            topRow: face.top_row * imageHeight,
            rightCol: imageWidth - ( face.right_col * imageWidth),
            bottomRow: imageHeight - (face.bottom_row * imageHeight)
        }))

        console.log(boxes);

        return (
            <>
            {
                boxes.map((face, index) => {
                    return <div key={index} className='bounding-box' 
                    style={{top: `${face.topRow}px`, right: `${face.rightCol}px`, bottom: `${face.bottomRow}px`, left: `${face.leftCol}px`,
                    width: `${imageWidth - (face.rightCol + face.leftCol)}px`, height: `${ imageHeight - (face.bottomRow + face.topRow)}px`}}></div>
                })
            }
            </>
        );
    }

    const getErrorMessage = (optional?: string) => {
        if (!state.hasInput) return 'Please enter an image url';
        else if (!state.isUrl) return 'Given input is not an url';
        else if (!state.isImage) return 'Given input is not an image url';
        else if (!optional) return 'Something went wrong!';
        return optional;
    }

    const handleSubmit = async () => {
        const { input } = state;

        if (!input.length) return toggleState(SET_HAS_INPUT);

        if (!['.jpeg', '.jpg', '.png'].some(val => input.includes(val))) return toggleState(SET_IS_IMAGE);

        const res2 = await fetch(baseUrl + '/fetchimage', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ imageUrl: input })
        });

        if (res2.status === 200) {
            const faceData = await res2.json() as FaceData;

            dispatch({
                type: SET_FACE_DATA,
                payload: faceData,
            })
        }
    }

    const toggleState = (stateType: BOOLEANS) => {
        dispatch({
            type: stateType,
            payload: false,
        });
        dispatch({ type: SET_ACTIVE_BOOLEAN, payload: stateType });
        dispatch({ type: SET_FACE_DATA, payload: null });

        setTimeout(() => {
            dispatch({ type: stateType, payload: true })
            dispatch({ type: SET_ACTIVE_BOOLEAN, payload: null });
        }, 3000);
    }

    return (
        <>
        <div className="image-form-body">
            <div className="image-form-border">
                <input value={state.input} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    dispatch({
                        type: SET_INPUT,
                        payload: event.target.value
                    })
                }} />
                <button type="button" onClick={handleSubmit}>DETECT</button>
            </div>
            <div className="image-form-image-container">
             <img id="image-form-imageBody" src={state.input} alt="" />
            {
                state.input ? calculateFaceBox() : ''
            }
            </div>
            { state.activeBoolean ? <MessageBar type="error" message={getErrorMessage()} handleClose={() => {
                if (!state.activeBoolean) return;
                dispatch({ type: SET_ACTIVE_BOOLEAN, payload: null });
            }} /> : ''}
        </div>
        </>
    )
}

function stateReducer(state: ImageFormState, action: ImageFormAction) {
    switch (action.type) {
        case SET_INPUT:
            return { ...state, input: action.payload }

        case SET_IS_URL:
            return { ...state, isURL: action.payload }
        
        case SET_IS_IMAGE:
            return { ...state, isImage: action.payload }

        case SET_HAS_INPUT:
            return { ...state, hasInput: action.payload }

        case SET_FACE_DATA:
            return { ...state, faceData: action.payload }

        case SET_ACTIVE_BOOLEAN:
            return { ...state, activeBoolean: action.payload }

        default:
            return state;
    }
}

export default ImageForm
