import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'likesPipe'
})
export class LikesPipePipe implements PipeTransform {

  transform(value: number, ...args: number[]): number {
    if (!(value)){
      return args[0];
    }else{
      return value;
    }
    
  }

}
