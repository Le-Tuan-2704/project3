<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Test $test)
    {
        //
        $questions = $test->questions;
        return response()->json([
            'error_code' => 0,
            'questions' => $questions,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req, Test $test)
    {
        //
        $validator = Validator::make($req->all(),[
            'content' => 'required',
            'choice1' => 'required',
            'choice2' => 'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'error_code' => 1,
                'error' => $validator->errors()
            ], 200);
        }
        $question = new Question($req->all());
        $question->test_id = $test->id;
        if($question->save()){
            return response()->json([
                'error_code' => 2,
                'msg' => 'add question fail'
            ], 200);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, Question $question)
    {
        $changedable = ['content', 'choice1', 'choice2', 'choice3', 'choice4'];
        foreach($changedable as $key){
            if($req[$key]){
                $question[$key] = $req[$key];
            }
        }
        if($question->save()){
            return response()->json([
                'error_code' => 0,
                'question' => $question
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'update question fail'
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        if($question->delete()){
            return response()->json([
                'error_code' => 0,
                'msg' => 'delete question successfully'
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'delete question fails'
            ], 200);
        }
    }
}
