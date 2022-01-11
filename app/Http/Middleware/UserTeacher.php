<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class UserTeacher
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $checkTeacher = User::where("id", $request->user_id)->first();
        if ($checkTeacher->role != 1) {
            return response()->json([
                "msg" => "bạn không có quyền truy cập(t)"
            ]);
        }



        return $next($request);
    }
}