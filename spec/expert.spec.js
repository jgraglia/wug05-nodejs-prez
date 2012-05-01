expert = require('../libs/expert');

describe('expert module', function(){

  it('should handle zero value', function(){
    expect(expert.compute(6, 0)).toEqual(0);
  });
  
  it('should handle negative values', function(){
    expect(expert.compute(6, -5)).toEqual(-30);
  });
  
  it("should compute quickly", function(done) {
      expert.quickCompute(5, 4, function(result){
        expect(result).toEqual(20);
        done();
      });
  });
});
