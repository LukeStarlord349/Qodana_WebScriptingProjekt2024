<?php

class comment
{
    public $id;
    public $appointment_id;
    public $timestamp;
    public $content;
    public $author;

    function __construct($id, $appointment_id, $timestamp, $content, $author)
    {
        $this->id = $id;
        $this->appointment_id = $appointment_id;
        $this->timestamp = $timestamp;
        $this->content = $content;
        $this->author = $author;
    }
}