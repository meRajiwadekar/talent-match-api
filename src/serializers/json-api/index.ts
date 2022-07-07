import createTransformalizer from 'transformalizer';
import ratings from '../../routes/user/ratings';
import job from './job';
import user from './user';
const serializer = createTransformalizer();

export default serializer;

export function registerSerializers(){
    serializer.register(user);
    serializer.register(job);
    serializer.register(ratings);
}


export function queryParamIncludes(includes: string | undefined, data = {}): any {
    if (!includes) {
      return {};
    }
  
    let keys = includes.split(',');
  
    keys.forEach((key) => {
      if (key.includes('.')) {
        let [subType, ...subIncludes] = key.split('.');
        data[subType] = data[subType] || {};
        let subIncludesJoined = subIncludes.join('.');
        return queryParamIncludes(subIncludesJoined, data[subType]);
      }
  
      data[key] = data[key] || {};
      data[key].self = true;
    });
  
    return data;
  }
  