<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonCourses extends Model
{
    use HasFactory;
    protected $fillable = [
        "id_section",
        "name",
        "duration",
        "url",
        "info"
    ];
}