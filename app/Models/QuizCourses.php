<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizCourses extends Model
{
    use HasFactory;
    protected $fillable = [
        "id_section", "id_lesson", "name", "question"
    ];
}