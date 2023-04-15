<?php

use App\Bookable;
use App\Booking;
use Illuminate\Database\Seeder;

class BookingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Bookable::all()->each(function (Bookable $bookable) {
            $book = factory(Booking::class)->make();
            $books = collect([$book]);
            for ($i = 0; $i < random_int(1, 20); $i++) {
                $from = (clone ($book->to))->addDays(random_int(1, 14));
                $to = (clone ($from))->addDays(random_int(1, 14));

                $booking = Booking::make([
                    'from' => $from,
                    'to' => $to,
                ]);
                $books->push($booking);
            }
            $bookable->bookings()->saveMany($books);
        });
    }
}
