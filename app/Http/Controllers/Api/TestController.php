<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Course;
use Illuminate\Http\Request;
use App\Models\Test;

class TestController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req, Course $course)
    {
        //
        $validator = Validator::make($req->all(), [
            'name' => 'required|max:255',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error_code' => 1,
                'error' => $validator->errors()
            ], 200);
        }
        $test = new Test($req->all());
        $test->course_id = $course->id;
        if($test->save()){
            return response()->json([
                'error_code' => 0,
                'test' => $test,
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'add test fail',
            ], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Test $test)
    {
        //
        return response()->json([
            'error_code' => 0,
            'test' => $test,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, Test $test)
    {
        //
        $changedable = ['name', 'description'];
        foreach($changedable as $key){
            if($req[$key]){
                $test[$key] = $req[$key];
            }
        }
        if($test->save()){
            return response()->json([
                'error_code' => 0,
                'test' => $test,
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'update test fail'
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Test $test)
    {
        //
        if($test->delete()){
            return response()->json([
                'error_code' => 0,
                'msg' => 'Delete test successfully'
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'Delete test fail'
            ], 200);
        }
    }
}
