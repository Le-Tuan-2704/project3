<?php

namespace App\Http\Middleware;

use App\Models\SessionUser;
use Closure;
use Illuminate\Http\Request;

class UserLogin
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
        $token = $request->header('token');
        $checkTokenIsValid = SessionUser::where('token', $token)->first();
        if (empty($token)) {
            return response()->json([
                'code' => 401,
                'message' => "token ko dc rong"
            ], 401);
        } elseif (empty($checkTokenIsValid)) {
            return response()->json([
                'code' => 401,
                'massage' => "token ko hop le"
            ], 401);
        }

        $request["user_id"] = $checkTokenIsValid->user_id;
        return $next($request);
    }
}