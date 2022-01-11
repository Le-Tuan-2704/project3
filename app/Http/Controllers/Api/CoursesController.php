<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AnswerCourses;
use App\Models\BuyCourses;
use App\Models\Courses;
use App\Models\Instructor;
use App\Models\LessonCourses;
use App\Models\QuizCourses;
use App\Models\SectionCourses;
use App\Models\Teachers;
use App\Models\User;
use Illuminate\Http\Request;

class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data_courses = Courses::all();
        foreach ($data_courses as $courses) {
            $instructors = Instructor::where("id_courses", $courses->id)->get();
            $teachers = array();
            foreach ($instructors as $instructor) {
                $teacher = Teachers::where("user_id", $instructor->id_teacher)->first();
                array_push($teachers, $teacher);
            }
            $courses["instructor"] = $teachers;
        }

        return response()->json([
            "data" => $data_courses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $new_courses = $request->only("title", "introduce", "price", "thumbnail", "times");
        $courses = Courses::create($new_courses);
        $new_instructor = [
            "id_courses" => $courses->id,
            "id_teacher" => $request->user_id
        ];
        $instructor = Instructor::create($new_instructor);
        $teacher = Teachers::where("user_id", $request->user_id)->first();
        return response()->json([
            "msg" => "tạo khóa học thành công",
            "courses" => $courses,
            "instructor" => $teacher
        ]);
    }

    public function search_courses(Request $request)
    {
        $data_courses = Courses::all();
        $data = array();
        foreach ($data_courses as $courses) {
            if (strpos($courses->title, $request->keyword) !== false || strpos($courses->introduce, $request->keyword))
                array_push($data, $courses);
        }

        return response()->json([
            "msg" => "thành công",
            "data" => $data
        ]);
    }

    public function buy_courses(Request $request)
    {
        $courses = Courses::where("id", $request->id_courses)->first();
        if (empty($courses)) {
            return response()->json([
                "msg" => "khóa học không tồn tại"
            ]);
        }

        $buy_courses = BuyCourses::where([
            ["id_courses", $request->id_courses],
            ["id_student", $request->user_id]
        ]);

        if (!empty($buy_courses)) {
            return response()->json([
                "msg" => "bạn đã mua khóa học"
            ]);
        }

        // thực hiện thanh toán
        // kiểm tra thanh toán thành công

        $buy_courses = [
            "id_courses" => $request->id_courses,
            "id_student" => $request->user_id
        ];

        $receipt = BuyCourses::create($buy_courses);

        return response()->json([
            "msg" => "thanh toán thành công",
            "courses" => $courses,
            "receipt" => $receipt
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {

        $courses = Courses::where("id", $id)->first();
        if (empty($courses)) {
            return response()->json([
                "msg" => "khóa học không tồn tại"
            ]);
        }
        $get_courses = $courses;
        $instructors = Instructor::where("id_courses", $courses->id)->get();
        $teachers = array();
        foreach ($instructors as $instructor) {
            $teacher = Teachers::where("user_id", $instructor->id_teacher)->first();
            $teacher = $teacher->only("bio", "introduce");
            $user = User::where("id", $instructor->id_teacher)->first();
            $teacher["name"] = $user->fullname;
            array_push($teachers, $teacher);
        }
        $get_courses["instructor"] = $teachers;

        $sections = SectionCourses::where("id_courses", $id)->get();

        foreach ($sections as $section) {
            $lessons = LessonCourses::where("id_section", $section->id)->get();
            foreach ($lessons as $lesson) {
                $quizs = QuizCourses::where([
                    ["id_section", $section->id],
                    ["id_lesson", $lesson->id]
                ])->get();
                foreach ($quizs as $quiz) {
                    $answer = AnswerCourses::where([
                        ["id_quiz", $quiz->id],
                    ])->first();
                    $quiz["answer"] = $answer;
                }

                $lesson["quiz"] = $quizs;
            }
            $section["lessons"] = $lessons;
        }
        $get_courses["sections"] = $sections;
        return response()->json([
            "msg" => "thành công",
            "data" => $get_courses
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}