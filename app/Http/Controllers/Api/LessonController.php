<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BuyCourses;
use App\Models\Instructor;
use App\Models\LessonCourses;
use App\Models\SectionCourses;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $checksection = SectionCourses::where("id", $request->id_section)->first();
        if (empty($checksection)) {
            return response()->json([
                "msg" => "section ko tồn tại.!"
            ]);
        }

        $checkuser = Instructor::where([
            ["id_courses", $checksection->id_courses],
            ["id_teacher", $request->user_id]
        ])->first();

        $checkbuy = BuyCourses::where([
            ["id_courses", $checksection->id_courses],
            ["id_student", $request->user_id]
        ])->first();
        $lessons = LessonCourses::where("id_section", $request->id_section)->get();
        if ($checkbuy || $checkuser) {
            return response()->json([
                "msg" => "thành công",
                "sections" => $checksection,
                "lessons" => $lessons
            ]);
        } else {
            foreach ($lessons as $lesson) {
                $lesson["url"] = "";
            }
            return response()->json([
                "msg" => "thành công",
                "sections" => $checksection,
                "lessons" => $lessons
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $checksection = SectionCourses::where("id", $request->id_section)->first();
        if (empty($checksection)) {
            return response()->json([
                "msg" => "section ko tồn tại.!"
            ]);
        }
        $islesson = LessonCourses::where([
            ["id_section", $request->id_section],
            ["name", $request->name]
        ])->first();
        if (!empty($islesson)) {
            return response()->json([
                "msg" => "lesson đã tồn tại.!"
            ]);
        }

        $checkuser = Instructor::where([
            ["id_courses", $checksection->id_courses],
            ["id_teacher", $request->user_id]
        ])->first();
        if (empty($checkuser)) {
            return response()->json([
                "msg" => "bạn ko thể thêm lesson.!"
            ]);
        }

        $data = $request->only("id_section", "name", "duration", "url", "info");
        $lesson = LessonCourses::create($data);
        return response()->json([
            "msg" => "tạo thành công",
            "section" => $checksection,
            "lesson" => $lesson
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $checksection = SectionCourses::where("id", $request->id_section)->first();
        if (empty($checksection)) {
            return response()->json([
                "msg" => "section ko tồn tại.!"
            ]);
        }

        $lesson = LessonCourses::where([
            ["id_section", $request->id_section],
            ["id", $request->id_lesson]
        ])->first();
        if (empty($checksection)) {
            return response()->json([
                "msg" => "lesson ko tồn tại.!"
            ]);
        }


        $checkuser = Instructor::where([
            ["id_courses", $checksection->id_courses],
            ["id_teacher", $request->user_id]
        ])->first();

        $checkbuy = BuyCourses::where([
            ["id_courses", $checksection->id_courses],
            ["id_student", $request->user_id]
        ])->first();

        if ($checkbuy || $checkuser) {
            return response()->json([
                "msg" => "thành công",
                "sections" => $checksection,
                "lesson" => $lesson
            ]);
        } else {

            $lesson["url"] = "";
            return response()->json([
                "msg" => "thành công",
                "sections" => $checksection,
                "lessons" => $lesson
            ]);
        }
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
    public function destroy(Request $request, $id)
    {
        $checklesson = LessonCourses::where("id", $id)->first();
        if (empty($checklesson)) {
            return response()->json([
                "msg" => "lesson ko tồn tại.!"
            ]);
        }

        $checkuser = Instructor::where([
            ["id_courses", $request->id_courses],
            ["id_teacher", $request->user_id]
        ])->first();
        if (empty($checkuser)) {
            return response()->json([
                "msg" => "bạn ko thể xóa"
            ]);
        }

        $checklesson->delete();
        return response()->json([
            "msg" => "xóa thành công"
        ]);
    }
}