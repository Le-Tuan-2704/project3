<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailResetPassword extends Mailable
{
    use Queueable, SerializesModels;

    protected $email;
    protected $password;
    protected $name;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($email, $password, $name)
    {
        $this->email = $email;
        $this->password = $password;
        $this->name = $name;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from($this->email)->subject("reset password")->view('mail.resetpasswordMail')->with([
            "name" => $this->name,
            "img" => "http://localhost/example-app/public/img/test.jpg",
            "password" => $this->password,
        ]);
    }
}