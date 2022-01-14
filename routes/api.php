<?php

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * đăng nhập
 * nếu đúng: trả token
 */
Route::post("log-in", "Api\UserController@logIn");
/**
 * tạo tài khoản
 */
Route::post("sign-up", "Api\UserController@signUp");
/**
 * thay đổi mật khẩu
 */
Route::post("change-password", "Api\UserController@changePassword")->middleware('auth_login');
/**
 * quên mất khẩu
 */
Route::post("forget-password", "Api\UserController@forgetPassword");
/**
 * lấy thông tin người dùng
 */
Route::get("my-info", "Api\UserController@show")->middleware('auth_login');
/**
 * thay đổi thông tin người dùng
 */
Route::put("my-info", "Api\UserController@update")->middleware('auth_login');
/**
 * lấy tất cả khóa học
 */
Route::get('courses', "Api\CourseController@index");
/**
 * lấy thông tin khóa học theo id
 */
Route::get('course/{course}', "Api\CourseController@show");
/**
 * lấy cây thông tin khóa học
 */
Route::get("my-course-tree", "Api\CourseController@myCourseTree")->middleware('auth_login');
/**
 * tìm kiếm khóa học
 */
Route::get('search-course/{keyword}', "Api\CourseController@search");
//Route::post('register-course/{courseId}', "Api\CoourseController@register")->middleware('auth_login');

/** 
 * quyền của admin
 */
Route::middleware(['auth_login', 'admin'])->group(function () {
    /**
     * lấy danh sách học viên
     */
    Route::get("students", "Api\StudentController@index");
    /**
     * lấy danh sách giảng viên
     */
    Route::get("teachers", "Api\TeacherController@index");
    /**
     * xóa người dùng
     */
    Route::delete("user/{user}", "Api\UserController@destroy");
    /**
     * kích hoặt tài khoản giảng viên
     */
    Route::put("active-teacher/{teacher}", "Api\TeacherController@activeTeacher");
    /**
     * vô hiệu hóa tài khoản giảng viên
     */
    Route::put("inactive-teacher/{teacher}", "Api\TeacherController@inactiveTeacher");

    /**
     * tạo mới khóa học
     */
    Route::post("course", "Api\CourseController@store");

    /**
     * sửa khóa học
     */
    Route::put("course/{course}", "Api\CourseController@update");
    /**
     * xóa khóa học
     */
    Route::delete('course/{course}', 'Api\CourseController@destroy');
    /**
     * thêm học viên vào kháo học
     */
    Route::post('course/{course}/add-student/{student}', 'Api\CourseController@addStudent');
    /**
     * thêm giảng viên vào khóa học
     */
    Route::post('course/{course}/add-teacher/{teacher}', 'Api\CourseController@addTeacher');
    /**
     * xóa học viên khỏi khóa học
     */
    Route::delete('course/{course}/delete-student/{student}', "Api\CourseController@deleteStudent");
    /**
     * xóa giảng viên khỏi khóa học
     */
    Route::delete('course/{course}/delete-teacher/{teacher}', "Api\CourseController@deleteTeacher");
    /**
     * lấy danh sách thành viên trong khóa học bao gồm học viên và giảng viên
     */
    Route::get('course/{course}/members', "Api\CourseController@getMember");
});

/**
 * lấy thông tin bài giảng
 */
Route::get("lecture/{lecture}", "Api\LectureController@show");
/**
 * lấy thông tin bài test
 */
Route::get("test/{test}", "Api\TestController@show");
/**
 * lấy câu hỏi của bài test
 */
Route::get("test/{test}/questions", "Api\QuestionController@index");

/**
 * quyền của giảng viên
 */
Route::middleware(['auth_login', 'teacher'])->group(function () {
    /**
     * tạo mới bài giảng
     */
    Route::post("course/{course}/lecture", "Api\LectureController@store");
    /**
     * cập nhập bài giảng
     */
    Route::put("lecture/{lecture}", "Api\LectureController@update");
    /**
     * xóa bài giảng
     */
    Route::delete("lecture/{lecture}", "Api\LectureController@destroy");
    /**
     * thêm mới bài test
     */
    Route::post("course/{course}/test", "Api\TestController@store");
    /**
     * cập nhập thông tin bài test
     */
    Route::put("/test/{test}", "Api\TestController@update");
    /**
     * xóa bài test
     */
    Route::delete("test/{test}", "Api\TestController@destroy");

    /**
     * thêm mới câu hỏi
     */
    Route::post("test/{test}/question", "Api\QuestionController@store");
    /**
     * cập nhập câu hỏi
     */
    Route::put("question/{question}", "Api\QuestionController@update");
    /**
     * xóa câu hỏi
     */
    Route::delete("question/{question}", "Api\QuestionController@destroy");
});

/**
 * lấy comments bài giảng 
 */
Route::get("lecture/{lecture}/comments", "Api\CommentController@index");
/**
 * tạo mới comment
 */
Route::post("lecture/{lecture}/comment", "Api\CommentController@store")->middleware('auth_login');
/**
 * cập nhập comment
 */
Route::put("comment/{comment}", "Api\CommentController@update")->middleware('auth_login');
/**
 * xóa comment
 */
Route::delete("comment/{comment}", "Api\CommentController@destroy")->middleware('auth_login');