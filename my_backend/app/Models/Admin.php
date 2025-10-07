<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admins';
    protected $primaryKey = 'id_admin';
    public $timestamps = false; // car tu n'as pas créé les colonnes created_at/updated_at

    protected $fillable = [
        'email',
        'password',
    ];
}
