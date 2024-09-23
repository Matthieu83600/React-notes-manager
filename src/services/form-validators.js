export class ValidatorService {
    static min(value, min) {
        if(value.length < min) {
            return `Has to be at least ${min} characters long`;
        }
    };
    static max(value, max) {
        if(value.length > max) {
            return `Can't exceed ${max} characters`;
        }
    };
};