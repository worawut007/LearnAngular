import { SheredsModule } from './shereds.module';

describe('SheredsModule', () => {
  let sheredsModule: SheredsModule;

  beforeEach(() => {
    sheredsModule = new SheredsModule();
  });

  it('should create an instance', () => {
    expect(sheredsModule).toBeTruthy();
  });
});
