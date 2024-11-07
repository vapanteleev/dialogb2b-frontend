import axios, { AxiosInstance } from 'axios';

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3000/api',
        });
    }

    /**
     * Description
     * 
     * @async
     * @method
     * @name registerUser
     * @kind method
     * @memberof ApiService
     * @public
     * @param {any} userData
     * @returns {Promise<AxiosResponse<any, any>>}
     */
    public async registerUser(userData: any) {
        return this.api.post('/auth/register', userData);
    }

    /**
     * Description
     * 
     * @async
     * @method
     * @name loginUser
     * @kind method
     * @memberof ApiService
     * @public
     * @param {any} credentials
     * @returns {Promise<AxiosResponse<any, any>>}
     */
    /**
     * Description
     * 
     * @async
     * @method
     * @name loginUser
     * @kind method
     * @memberof ApiService
     * @public
     * @param {any} credentials
     * @returns {Promise<AxiosResponse<any, any>>}
     */
    public async loginUser(credentials: any) {
        return this.api.post('/auth/login', credentials);
    }

    public async getRequests(token: string) {
        return this.api.get('/requests', {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    /**
     * Description
     * 
     * @async
     * @method
     * @name getResponses
     * @kind method
     * @memberof ApiService
     * @public
     * @param {number} requestId
     * @param {string} token
     * @returns {Promise<AxiosResponse<any, any>>}
     */
    public async getResponses(requestId: number, token: string) {
        return this.api.get(`/responses/${requestId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    /**
     * Description
     * 
     * @async
     * @method
     * @name createResponse
     * @kind method
     * @memberof ApiService
     * @public
     * @param {any} response
     * @param {string} token
     * @returns {Promise<AxiosResponse<any, any>>}
     */
    public async createResponse(response: any, token: string) {
        return this.api.post('/responses', response, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export default new ApiService();