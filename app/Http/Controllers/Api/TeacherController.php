<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\User;
use App\Http\Controllers\util\ObjectToArray;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    //
    function index(){
        $users = User::where('position', 'teacher')->get();
        $teachers = Teacher::all();
        foreach ($users as $user) {
            $merge[$user->id] = $user;
        }
        foreach($teachers as $teacher){
            $merge[$teacher['user_id']] = ObjectToArray::mergeObjectsToArray($merge[$teacher['user_id']], $teacher);
        }
        $data = array();
        foreach($merge as $item){
            $data[] = $item;
        }
        return response()->json([
            'error_code' => 0,
            'teachers' => $data,
        ], 200);
    }
    function activeTeacher(Teacher $teacher){
        $teacher->active = 1;
        if($teacher->save()){
            return response()->json([
                'error_code' => 0,
                'msg' => "Active teacher is okey",
            ]);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => "Active teacher error",
            ]);
        }
    }
    function inactiveTeacher(Teacher $teacher){
        if(!$teacher){
            return response()->json([
                'error_code' => 2,
                'msg' => "teacher's id not correct",
            ]);
        }
        $teacher->active = 0;
        if($teacher->save()){
            return response()->json([
                'error_code' => 0,
                'msg' => "In-active teacher is okey",
            ]);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => "In-active teacher error",
            ]);
        }
    }
}
