<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ConfirmEmail;
use App\Mail\EmailResetPassword;
use App\Models\SessionUser;
use App\Models\User;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{
    //
    public function login(Request $req)
    {
        $checkUser = $req->only('email', "password");
        if (Auth::attempt($checkUser)) {
            $checkTokenExit = SessionUser::where('user_id', Auth::id())->first();
            $user = User::where('id', Auth::id())->first();
            if ($user->active != 1) {
                return response()->json([
                    "msg" => "tài khoản chưa được xác thực"
                ]);
            }
            if (empty($checkTokenExit)) {
                $userSession = SessionUser::create([
                    "token" => Str::random(60),
                    'refresh_token' => Str::random(60),
                    'token_expried' => date('Y-m-d H:i:s', strtotime('+30 day')),
                    'refresh_token_expried' => date('Y-m-d H:i:s', strtotime('+365 day')),
                    'user_id' => Auth::id(),
                ]);
            } else {
                $userSession = $checkTokenExit;
            }
            $data = $user;
            $data["token"] = $userSession->token;
            return response()->json([
                "msg" => "đăng nhập thành công",
                "data" => $data
            ], 200);
        } else {
            return response()->json([
                'msg' => "tài khoản không tồn tại",
            ], 200);
        }
    }

    public function reset_password(Request $req)
    {
        $checkEmail = User::where('email', $req->email)->first();
        if (empty($checkEmail)) {
            return response()->json([
                "msg" => "email ko tồn tại"
            ], 201);
        }

        $new_password = Str::random(8);
        $checkEmail->update(["password" => Hash::make($new_password)]);
        Mail::to("tuan.ld184004@sis.hust.edu.vn")->send(new EmailResetPassword($req->email, $new_password, $checkEmail->username));

        return response()->json([
            "data" => $checkEmail,
            "msg" => "reset mật khẩu thành công"
        ], 200);
    }

    public function change_password(Request $req)
    {
        $checkPassword = User::where('id', $req->user_id)->first();
        if (Hash::check($req->password, $checkPassword->password)) {
            $passwordnew = [
                'password' => Hash::make($req->new_password)
            ];
            $checkPassword->update($passwordnew);
            return response()->json([
                "data" => $checkPassword,
                "msg" => "đổi mật khẩu thành công"
            ], 200);
        } else {
            return response()->json([
                "msg" => "mật khẩu không đúng"
            ], 200);
        }
    }

    public function sign_up(Request $req)
    {
        $checkEmail = User::where('email', $req->email)->first();
        if (!empty($checkEmail)) {
            return response()->json([
                "msg" => "email đã tồn tại"
            ], 201);
        }

        $checkUserName = User::where('username', $req->username)->first();
        if (!empty($checkUserName)) {
            return response()->json([
                "msg" => "username đã tồn tại"
            ], 201);
        }

        $userCreate = User::create([
            "username" => $req->username,
            "fullname" => $req->fullname,
            "email" => $req->email,
            "password" => Hash::make($req->password),
            "active" => 0,
            "role" => $req->role
        ]);

        Mail::to("tuan.ld184004@sis.hust.edu.vn")->send(new ConfirmEmail($req->username, $req->email));

        return response()->json([
            "msg" => "tạo thành công",
            "data" => $userCreate
        ], 200);
    }

    public function confirmUser($email)
    {
        $checkEmail = User::where('email', $email)->first();
        if (empty($checkEmail)) {
            return response()->json([
                "msg" => "email ko tồn tại"
            ], 201);
        }
        $checkEmail->update(["active" => 1]);
        return view("mail.thankyou");
    }

    public function upload_avatar(Request $req)
    {
        $user = User::where('id', $req->user_id)->first();
        $file = $req->img->extension();

        if ($file != "jpg" && $file != "jpeg" && $file != "png") {
            return response()->json([
                "msg" => "định dạng file ko đúng"
            ]);
        }

        $fileName = $user->username . '.' . $req->img->extension();

        $req->img->move(public_path('avatar_user'), $fileName);
        $user->update(["avatar" => $fileName]);
        return response()->json([
            "msg" => "upload ảnh thành công",
            "data" => $user
        ], 201);
    }

    public function test(Request $req)
    {
        Mail::to("tuan.ld184004@sis.hust.edu.vn")->send(new ConfirmEmail("le tuan", "abc@gmail.com"));
        return 1;
    }
}