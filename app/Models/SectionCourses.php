<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SectionCourses extends Model
{
    use HasFactory;
    protected $fillable = [
        "id_courses", "title"
    ];
}