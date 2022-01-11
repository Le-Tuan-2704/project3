<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ConfirmEmail extends Mailable
{
    use Queueable, SerializesModels;
    protected $email;
    protected $name;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $email)
    {
        $this->name = $name;
        $this->email = $email;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from($this->email)->subject("xác nhận tài khoản Example")->view('mail.checkuser')->with([
            "name" => $this->name,
            "url" => "http://127.0.0.1:8000/api/confirmUser/" . $this->email,
            "img" => "http://localhost/example-app/public/img/test.jpg"
        ]);
        // ->attach('/public/img/test.jpg'); //đính kèm ảnh cùng với email
    }
}