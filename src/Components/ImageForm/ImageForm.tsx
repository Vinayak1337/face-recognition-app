import { ChangeEvent, FC, useReducer } from 'react'
import { baseUrl } from '../../Assets/data'
import './ImageForm.scss'

const SET_INPUT = 'set_input';
const SET_IS_URL = 'set_is_url';
const SET_IS_IMAGE = 'set_is_image';
const SET_FACE_DATA = 'set_face_data';
const SET_HAS_INPUT = 'set_has_input';

type BOOLEANS = typeof SET_IS_URL | typeof SET_IS_IMAGE | typeof SET_HAS_INPUT;

const ImageForm: FC = () => {
    const [state, dispatch] = useReducer(stateReducer, {
        input: '',
        isUrl: true,
        isImage: true,
        hasInput: true,
        faceData: null,
    });

    const handleSubmit = async () => {
        const { input } = state;

        if (!input.length) return toggleState(SET_HAS_INPUT);

        const res = await fetch(input);
        if (!(res.status === 200)) return toggleState(SET_IS_URL);

        if (!['.jpeg', '.jpg', '.png'].some(val => input.includes(val))) return toggleState(SET_IS_IMAGE);

        console.log('fetch image');
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

    const toggleState = (state: BOOLEANS) => {
        dispatch({
            type: state,
            payload: false,
        });
        dispatch({ type: SET_FACE_DATA, payload: null });

        setTimeout(() => dispatch({ type: state, payload: true }), 5000);
    }

    return (
        <div className="image-form-body">
            <div className="image-form-border">
            <input value={state.input} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                dispatch({
                    type: SET_INPUT,
                    payload: event?.target.value
                })
            }} />
            <button type="button" onClick={handleSubmit}>DETECT</button>
            </div>
        </div>
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

        default:
            return state;
    }
}

export default ImageForm
