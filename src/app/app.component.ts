import { Component } from '@angular/core'
import { CommonModule, NgClass, NgOptimizedImage } from '@angular/common'
import { AbstractControl, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [ReactiveFormsModule, NgOptimizedImage, CommonModule],
})
export class AppComponent {
	public passwordControl = new FormControl(null, [
		Validators.required,
		Validators.minLength(8),
		this.passwordStrengthValidator,
	])

	passwordStrengthValidator(control: AbstractControl) {
		const password = control.value

		if (!password) {
			return null
		}

		const onlyLetters = /[a-zA-Z]+/
		const onlyDigits = /\d+/
		const onlySymbols = /[^\w\s]+/

		const containLetters = Boolean(password.match(onlyLetters))
		const containDigits = Boolean(password.match(onlyDigits))
		const containSymbols = Boolean(password.match(onlySymbols))

		if (containLetters && containDigits && containSymbols) {
			return { strongPassword: true, passwordStrength: 'strong' }
		}

		if (
			(containLetters && containSymbols) ||
			(containLetters && containDigits) ||
			(containDigits && containSymbols)
		) {
			return { mediumPassword: true, passwordStrength: 'medium' }
		}

		if (containLetters || containDigits || containSymbols) {
			return { easyPassword: true, passwordStrength: 'easy' }
		}

		return control.errors
	}
}
