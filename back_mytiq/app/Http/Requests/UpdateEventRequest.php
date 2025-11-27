<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
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
            'title'        => 'sometimes|string|max:255',
            'description'  => 'sometimes|string|max:1000',
            'localisation' => 'sometimes|string|max:255',
            'date'         => 'sometimes|date|after:today',
            'capacite'     => 'sometimes|integer|min:1|max:5000',
            'image'        => 'sometimes', 
            'prix'         => 'sometimes|numeric|min:0',
            'status'       => 'sometimes|in:pending,confirmed,cancelled',
        ];
    }

    public function message(){
      return [
        'title.sometimes'        => 'Le titre est obligatoire.',
        'description.sometimes'  => 'La description est obligatoire.',
        'localisation.sometimes' => 'La localisation est obligatoire.',
        'date.sometimes'         => 'La date est obligatoire.',
        'capacite.sometimes'     => 'La capacité est obligatoire.',
        'image.sometimes'        => 'L’image est obligatoire.',
        'prix.sometimes'         => 'Le prix est obligatoire.',
        'status.sometimes'       => 'Le statut est obligatoire.',
      ];
    }
}
