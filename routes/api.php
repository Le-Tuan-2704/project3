<?php

use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("login", "Api\UserController@login");
Route::post("sign_up", "Api\UserController@sign_up");
Route::post("reset_password", "Api\UserController@reset_password");
Route::get("confirmUser/{email}", "Api\UserController@confirmUser");


Route::group(['middleware' => 'auth_login'], function () {
    //user
    Route::post("change_password", "Api\UserController@change_password");
    Route::post("upload_avatar", "Api\UserController@upload_avatar");


    //student
    Route::group(['middleware' => 'user_student'], function () {
        Route::get('courses', "Api\CoursesController@index");
        Route::post('follow_teacher', "Api\TeacherController@follow_teacher");
        Route::post('unfollow_teacher', "Api\TeacherController@unfollow_teacher");
        Route::post("instructor_profile", "Api\TeacherController@instructor_profile");

        Route::post('buy_courses', "Api\CoursesController@buy_courses");
        Route::post("quiz/point", "Api\QuizController@pointQuiz");
    });


    //teacher
    Route::group(['middleware' => 'user_teacher'], function () {
        Route::post("update_info_teacher", "Api\TeacherController@update_info_teacher");
        Route::post('courses', "Api\CoursesController@store");

        Route::post('section/create', "Api\SectionController@store");
        Route::delete('section/{id}', 'Api\SectionController@destroy');

        Route::post("lesson/create", "Api\LessonController@store");
        Route::delete('lesson/{id}', 'Api\LessonController@destroy');

        Route::post("quiz/create", "Api\QuizController@store");
    });

    //student and teacher
    Route::post("search_courses", "Api\CoursesController@search_courses");
    Route::get("courses/{id}", "Api\CoursesController@show");

    Route::post("section", "Api\SectionController@index");
    Route::post("section/show", "Api\SectionController@show");

    Route::post("lesson", "Api\LessonController@index");
    Route::post("lesson/show", "Api\LessonController@show");

    Route::get("test", "Api\UserController@test");
});