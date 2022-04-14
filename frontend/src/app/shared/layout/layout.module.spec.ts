import { LayoutModule } from './layout.module';

describe('LayoutModule', () => {
    let layoutModule: LayoutModule;

    beforeEach(() => {
        layoutModule = new LayoutModule();
    });

    it('should created', () => {
        expect(layoutModule).toBeTruthy();
    })
})