export class ApiResponse {

    constructor(status, data = null, message = null, error_code = null) {


        const response_status = {
            API_SUCCESS: 'success',
            API_FAIL: 'fail',
            API_ERROR: 'error'
        }

        if (!response_status.hasOwnProperty(status)) {
            throw new Error("Invalid Response Status");
        }

        const response = {
            'status': response_status[status],
        };
        if (data) {
            response['data'] = data;
        }
        if (message) {
            response['message'] = message;
        }
        if (error_code) {
            response['statusCode'] = error_code;
        }


        return response
    }

}
