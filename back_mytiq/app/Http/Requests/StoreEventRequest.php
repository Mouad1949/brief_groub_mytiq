<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'        => 'required|string|max:255',
            'description'  => 'required|string|max:1000',
            'localisation' => 'required|string|max:255',
            'date'         => 'required|date|after:today',
            'capacite'     => 'required|integer|min:1|max:5000',
            'image'        => 'required', 
            'prix'         => 'required|numeric|min:0',
            'status'       => 'required|in:pending,confirmed,cancelled',
        ];
    }

    public function message(){
      return [
        'title.required'        => 'Le titre est obligatoire.',
        'description.required'  => 'La description est obligatoire.',
        'localisation.required' => 'La localisation est obligatoire.',
        'date.required'         => 'La date est obligatoire.',
        'capacite.required'     => 'La capacité est obligatoire.',
        'image.required'        => 'L’image est obligatoire.',
        'prix.required'         => 'Le prix est obligatoire.',
        'status.required'       => 'Le statut est obligatoire.',
      ];
    }
}
