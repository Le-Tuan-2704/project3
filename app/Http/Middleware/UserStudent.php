<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class UserStudent
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
        $checkStudent = User::where("id", $request->user_id)->first();
        if ($checkStudent->role != 0) {
            return response()->json([
                "msg" => "bạn không có quyền truy cập(s)"
            ]);
        }

        return $next($request);
    }
}