<?php

namespace App\Http\Controllers\Api;

use App\Address;
use App\Booking;
use App\Bookable;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //Option 1
        $data = $request->validate([
            'bookings' => 'required|array|min:1',
            'bookings.*.bookable_id' => 'required|exist:bookables,id',
            'bookings.*.from' => 'required|date|after_or_qual:today',
            'bookings.*.to' => 'required|date|after_or_qual:bookings.*.from',

            'customer.first_name' => 'required|min:2',
            'customer.last_name' => 'required|min:2',
            'customer.email' => 'required|email',
            'customer.street' => 'required|min:2',
            'customer.city' => 'required|min:2',
            'customer.country' => 'required|min:2',
            'customer.state' => 'required|min:2',
            'customer.zip' => 'required|min:2|max:10',
        ],  [
            //Custom mesage
            'customer.zip.required' => 'The :attribute field is required.',
            'customer.zip.min' => 'The :attribute field must be at least :min digits.',
            'customer.zip.max' => 'The :attribute field may not be greater than :max digits.',
            '*.required' => 'The :attribute field is required.',
        ]);

        //Option 2
        // $validator = Validator::make($request->all(), [
        //     'bookings' => 'required|array|min:1',

        //     'customer.first_name' => 'required|min:2',
        //     'customer.last_name' => 'required|min:2',
        //     'customer.email' => 'required|email',
        //     'customer.street' => 'required|min:2',
        //     'customer.city' => 'required|min:2',
        //     'customer.country' => 'required|min:2',
        //     'customer.state' => 'required|min:2',
        //     'customer.zip' => 'required|min:2|max:10',
        // ],  [
        //     //Custom mesage
        //     'customer.zip.required' => 'The :attribute field is required.',
        //     'customer.zip.min' => 'The :attribute field must be at least :min digits.',
        //     'customer.zip.max' => 'The :attribute field may not be greater than :max digits.',
        //     '*.required' => 'The :attribute field is required.',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json(['errors' => $validator->errors()], 422);
        // }

        //Handle error
        // $errors = $validator->errors();
        // return response()->json($errors);
        // if ($errors->has('customer.zip')) {
        //     $zipErrors = $errors->get('customer.zip');
        //     // foreach ($zipErrors as $error) {
        //     //     echo $error . '<br>';
        //     // }
        // }

        // $data = $validator->validate();

        //End Option 2



        $data = array_merge($data, $request->validate([
            'bookings.*.bookable_id' => 'required|exist:bookables,id',
            'bookings.*.from' => 'required|date|after_or_qual:today',
            'bookings.*.to' => 'required|date|after_or_qual:bookings.*.from',
            'bookings.*' => ['required', function ($attr, $value, $fail) {
                $bookable = Bookable::findOrFail($value['bookable_id']);
                if (!$bookable->availableFor($value['from'], $value['to'])) {
                    $fail("This object is not avaliable in given dates");
                }
            }],
        ]));

        $bookingsData = $data['bookings'];
        $addressData = $data['customer'];

        $bookings = collect($bookingsData)->map(function ($bookingData) use ($addressData) {
            $booking = new Booking();
            $booking->from = $bookingData['from'];
            $booking->to = $bookingData['to'];
            $booking->price = 200;

            $booking->bookable_id = $bookingData['bookable_id'];
            $booking->address()->associate(Address::create($addressData));
            $booking->save();
            return $booking;
        });
        return $bookings;
    }
}
