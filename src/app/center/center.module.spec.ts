import { CenterModule } from './center.module';

describe('CenterModule', () => {
  let centerModule: CenterModule;

  beforeEach(() => {
    centerModule = new CenterModule();
  });

  it('should create an instance', () => {
    expect(centerModule).toBeTruthy();
  });
});
