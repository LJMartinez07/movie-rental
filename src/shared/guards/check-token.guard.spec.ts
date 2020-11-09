import { CheckTokenGuard } from "./check-token.guard";


describe('CheckTokenGuard', () => {
    it('should be defined', () => {
        expect(new CheckTokenGuard()).toBeDefined();
    });
});
