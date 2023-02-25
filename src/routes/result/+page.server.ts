import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import {writeFile, readFile, readFileSync} from 'fs';


const LEFT = 0;
const RIGHT = 1;

const gt=[
  LEFT,
  LEFT,
  RIGHT,
  RIGHT,
  RIGHT,
  LEFT,
  LEFT,
  LEFT,
  LEFT,
  LEFT,
  LEFT,
  RIGHT,
  RIGHT,
  LEFT,
  RIGHT,
  RIGHT,
  RIGHT,
  RIGHT,
  RIGHT,
  LEFT,
]


export const load: PageServerLoad = async () => {
  const data = readFileSync('./static/scores.json', 'utf8')
  return JSON.parse(data);
};



function saveScore(input:{name:string, score:number, choices:number[]}){
  readFile('./static/scores.json', 'utf8', function readFileCallback(err, data){
      if (!err) {
      const obj = JSON.parse(data); //now it an object
      obj.scores.push(input); //add some data
      const json = JSON.stringify(obj); //convert it back to json
      writeFile('./static/scores.json', json, 'utf8', 
        (err) => {
          if (err) throw err;
        }); // write it back 
  }});
}


export const actions: Actions = {
  default: async ({ request }) => {
    let error = undefined;
    try{
      const data = await request.formData();
      const name = data.get('name') as string;
      const choicesData =data.get('choices')??''
      const choices = JSON.parse(choicesData);
      const lastChoice = Number(data.get('lastChoice'));
      choices.push(lastChoice);
      if(!name || choices.length!=gt.length){
        error = "bad input";
      } else {
        let score = 0;
        for (let i = 0; i < choices.length; i++) {
          if (choices[i] == gt[i]) {
            score = score+1;
          }
        }
        saveScore({name:name, score:score, choices:choices});
        return {name:name, score:score, choices:choices, gt:gt}
      }
    }catch(err){
      error = "fail";
    }
    if (error) {
      throw redirect(301, '/')
    }

  }
};