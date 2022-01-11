<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Courses;
use App\Models\Instructor;
use App\Models\SectionCourses;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $checkcourses = Courses::where("id", $request->id_courses)->first();
        if (empty($checkcourses)) {
            return response()->json([
                "msg" => "courses ko tồn tại.!"
            ]);
        }
        $sections = SectionCourses::where("id_courses", $request->id_courses)->get();
        return response()->json([
            "msg" => "thành công",
            "courses" => $checkcourses,
            "sections" => $sections
        ]);
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
        // return $request;
        $data = $request->only("id_courses", "title");
        $issection = SectionCourses::where([
            ["id_courses", $request->id_courses],
            ["title", $request->title]
        ])->first();

        if (!empty($issection)) {
            return response()->json([
                "msg" => "section đã tồn tại.!"
            ]);
        }

        $checkcourses = Instructor::where([
            ["id_courses", $request->id_courses],
            ["id_teacher", $request->user_id]
        ])->first();

        // return $checkcourses;

        if (empty($checkcourses)) {
            return response()->json([
                "msg" => "bạn ko được phép thêm section vào courses này.!"
            ]);
        }

        $section = SectionCourses::create($data);
        return response()->json([
            "data" => $section,
            "msg" => "tạo thành công"
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
        $checkcourses = Courses::where("id", $request->id_courses)->first();
        if (empty($checkcourses)) {
            return response()->json([
                "msg" => "courses ko tồn tại.!"
            ]);
        }
        $section = SectionCourses::where([
            ["id_courses", $request->id_courses],
            ["id", $request->id_section]
        ])->first();

        if (empty($section)) {
            return response()->json([
                "msg" => "section ko tồn tại.!"
            ]);
        } else {
            return response()->json([
                "msg" => "thành công",
                "courses" => $checkcourses,
                "section" => $section
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
        $checksection = SectionCourses::where("id", $id)->first();
        if (empty($checksection)) {
            return response()->json([
                "msg" => "section ko tồn tại"
            ]);
        }
        $checkuser = Instructor::where([
            ["id_courses", $checksection->id_courses],
            ["id_teacher", $request->user_id]
        ])->first();
        if (empty($checkuser)) {
            return response()->json([
                "msg" => "bạn ko thể xóa"
            ]);
        }

        $checksection->delete();
        return response()->json([
            "msg" => "xóa thành công"
        ]);
    }
}