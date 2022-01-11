<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PointQuiz extends Model
{
    use HasFactory;
    protected $fillable = [
        "id_student", "id_quiz", "point"
    ];
}