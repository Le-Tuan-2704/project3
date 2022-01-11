<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnswerCourses extends Model
{
    use HasFactory;
    protected $fillable = [
        "id_quiz",
        "content",
        "is_true",
    ];
}