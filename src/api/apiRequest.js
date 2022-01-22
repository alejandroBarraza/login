import axios from 'axios'

const config = {
    header: {
        'Content-Type': 'application/json',
    },
}
export const PostRegister = async (dataRegister) => {
    try {
        const { data } = await axios.post('api/auth/register', dataRegister, config)
        return data
    } catch (error) {
        console.log(error)
    }
}
