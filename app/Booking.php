<?php

namespace App;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;


class Booking extends Model
{
    protected $table = 'bookings';
    protected $fillable = ['from', 'to'];

    public function bookable()
    {
        return $this->belongsTo(Bookable::class);
    }
    public function review()
    {
        return $this->hasOne(Review::class);
    }


    public function scopeBetweenDates(Builder $query, $from, $to)
    {
        return $query->where('from', '>=', $from)->where('to', '<=', $to);
    }

    public static function findByReviewKey(string $reviewKey): ?Booking
    {
        return static::where('review_key', $reviewKey)->with('bookable')->get()->first();
    }


    //Add event
    protected static function boot()
    {
        parent::boot();


        static::creating(function ($booking) {
            $booking->review_key  = Str::uuid();
        });
    }
}
