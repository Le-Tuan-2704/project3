<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Courses;
use App\Models\FollowTeacher;
use App\Models\Instructor;
use App\Models\Teachers;
use App\Models\User;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function update_info_teacher(Request $request)
    {
        $info_teacher = User::where("id", $request->user_id)->first();
        $data = $request->only("user_id", "bio", "introduce");
        $teacher = Teachers::create($data);
        $teacher["info"] = $info_teacher;
        return response()->json([
            "msg" => "cập nhập thông tin thành công",
            "data" => $teacher
        ]);
    }

    public function follow_teacher(Request $request)
    {

        $teacher = Teachers::where("user_id", $request->id_instructor)->first();
        if (empty($teacher)) {
            return response()->json([
                "msg" => "teacher ko tồn tại"
            ]);
        }
        $follow = FollowTeacher::create([
            "id_student" => $request->user_id,
            "id_teacher" => $request->id_instructor
        ]);
        return response()->json([
            "msg" => "follow thành công",
            "thông tin teacher" => $teacher,
            "thông tin follow" => $follow
        ]);
    }
    public function unfollow_teacher(Request $request)
    {
        $follow = FollowTeacher::where([
            ["id_student", $request->user_id],
            ["id_teacher", $request->id_instructor]
        ])->first();
        if (empty($follow)) {
            return response()->json([
                "msg" => "bạn chưa follow người ngày"
            ]);
        }

        $follow->delete();
        return response()->json([
            "msg" => "unfollow thành công"
        ]);
    }

    public function instructor_profile(Request $request)
    {
        $teacher = Teachers::where("user_id", $request->id_instructor)->first();
        if (empty($teacher)) {
            return response()->json([
                "msg" => "teacher ko tồn tại"
            ]);
        }
        $info_teacher = User::where("id", $request->id_instructor)->first();
        $info_teacher["bio"] = $teacher->bio;
        $info_teacher["introduce"] = $teacher->introduce;

        $instructors = Instructor::where("id_teacher", $request->id_instructor)->get();
        $data_courses = array();
        foreach ($instructors as $courses) {
            $data = Courses::where("id", $courses->id_courses)->first();
            array_push($data_courses, $data);
        }

        return response()->json([
            "msg" => "instructor profile",
            "info" => $info_teacher,
            "courses" => $data_courses
        ]);
    }
}