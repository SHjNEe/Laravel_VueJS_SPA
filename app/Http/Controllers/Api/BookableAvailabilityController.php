<?php

namespace App\Http\Controllers\Api;

use App\Bookable;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BookableAvailabilityController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id, Request $request)
    {
        $data = $request->validate([
            'from' => 'required|date_format:Y-m-d|after_or_equal:now',
            'to' => 'required|date_format:Y-m-d|after_or_equal:from'
        ], [
            'from.required' => 'The :attribute field is required',
            'from.date_format' => 'The :attribute must be in the format YYYY-MM-DD',
            'from.after_or_equal' => 'The :attribute must be today or a future date',
            'to.required' => 'The :attribute field is required',
            'to.date_format' => 'The :attribute must be in the format YYYY-MM-DD',
            'to.after_or_equal' => 'The :attribute must be on or after the start date'
        ]);

        $bookables = Bookable::findOrFail($id);
        // return $bookables->bookings()->betweenDates($data['from'], $data['to'])->get();
        return $bookables->availableFor($data['from'], $data['to'])
            ? response()->json([])
            : response()->json([], 404);
    }
}
