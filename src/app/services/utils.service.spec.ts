import { TestBed, inject } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let utilsService: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService]
    });
    utilsService = TestBed.get(UtilsService);

  });

  it('should be created', () => {
    expect(utilsService).toBeTruthy();
  });

  it('Should generate an integer less then N', () => {
    expect(utilsService.getRandomInt(10)).toBeLessThanOrEqual(10);
    expect(utilsService.getRandomInt(5)).toBeLessThanOrEqual(5);
    expect(utilsService.getRandomInt(2)).toBeLessThanOrEqual(2);
    expect(utilsService.getRandomInt(-10)).toBeGreaterThanOrEqual(-10);
  });

  it('Should generate an integer I between N and M', () => {
    verifyRange(0, 10);
    verifyRange(0, 100);
    verifyRange(10, 100);
    verifyRange(10, 1000);
    verifyRange(10, 10);
    verifyRange(100, 100);
  });

  it('Should return 0 if range is invalid', () => {
    let ret  = utilsService.getRandomIntMinAndMax(100, 0);
    expect(ret).toBe(0);
    ret  = utilsService.getRandomIntMinAndMax(200, 100);
    expect(ret).toBe(0);
  });

  const verifyRange = (N, M) => {
    const I = utilsService.getRandomIntMinAndMax(N, M);
    expect(I).toBeLessThanOrEqual(M);
    expect(I).toBeGreaterThanOrEqual(N);
  };

});
