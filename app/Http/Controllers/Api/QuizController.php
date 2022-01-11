<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AnswerCourses;
use App\Models\Instructor;
use App\Models\LessonCourses;
use App\Models\PointQuiz;
use App\Models\QuizCourses;
use App\Models\SectionCourses;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

        $checklesson = LessonCourses::where([
            ["id_section", $request->id_section],
            ["id", $request->id_lesson]
        ])->first();
        if (empty($checklesson)) {
            return response()->json([
                "msg" => "lesson ok tồn tại"
            ]);
        }
        $checkSection = SectionCourses::where("id", $request->id_section)->first();
        $checkUser = Instructor::where([
            ["id_courses", $checkSection->id_courses],
            ["id_teacher", $request->user_id]
        ])->first();
        if (empty($checkUser)) {
            return response()->json([
                "msg" => "courses ko tồn tại.!"
            ]);
        }


        $dataQuiz = $request->only("id_section", "id_lesson", "name", "question");
        $quiz = QuizCourses::create($dataQuiz);

        $dataAnswer = $request->answer;
        $dataAnswer["id_quiz"] = $quiz->id;
        $answer = AnswerCourses::create($dataAnswer);
        return response()->json([
            "msg" => "thành công",
            "quiz" => $quiz,
            "answes" => $answer
        ]);
    }

    public function pointQuiz(Request $request)
    {
        $checklesson = LessonCourses::where([
            ["id_section", $request->id_section],
            ["id", $request->id_lesson]
        ])->first();
        if (empty($checklesson)) {
            return response()->json([
                "msg" => "lesson ko tồn tại"
            ]);
        }



        $checkQuiz = QuizCourses::where("id", $request->id_quiz)->first();
        if (empty($checkQuiz)) {
            return response()->json([
                "msg" => "quiz ko tồn tại"
            ]);
        }
        // return $checkQuiz;

        $checkPointQuiz = PointQuiz::Where([
            ["id_quiz", $request->id_quiz],
            ["id_student", $request->user_id]
        ])->first();

        // return $checkPointQuiz;

        $dataPointQuiz["point"] = $request->highest_score;
        $dataPointQuiz["id_student"] = $request->user_id;
        $dataPointQuiz["id_quiz"] = $request->id_quiz;

        if (!empty($checkPointQuiz)) {
            $point = $checkPointQuiz->point - $request->highest_score;

            if ($checkPointQuiz->point < $request->highest_score) {

                $checkPointQuiz->update($dataPointQuiz);
                return response()->json([
                    "msg" => "số điểm cao hơn điểm lần trước " . -$point . " điểm.",
                    "point" => $dataPointQuiz,
                ]);
            } else {

                return response()->json([
                    "msg" => "số điểm thấp hơn điểm cao nhất " . $point . " điểm.",
                    "point" => $checkPointQuiz,
                ]);
            }
        } else {
            $pointQuiz = PointQuiz::create($dataPointQuiz);
            return response()->json([
                "msg" => "hoàn thành quiz với điểm cao nhất " . $pointQuiz->point . " điểm.",
                "point" => $pointQuiz
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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