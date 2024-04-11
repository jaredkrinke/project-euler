;;; Project Euler problem 26
SECTION .data
	newline db 10

SECTION .text
	global _start

;;; Print string from address in ecx, of length edx
prints:
	push ebx
	push eax
	mov eax, 4
	mov ebx, 1
	int 80h
	pop eax
	pop ebx
	ret

;;; Print character from address stored in ecx
printc:
	push edx
	mov edx, 1
	call prints
	pop edx
	ret

;;; Print the digit stored in eax
printd:
	push ecx
	push eax
	add eax, '0'		; ASCII-ify and push on stack
	push eax
	mov ecx, esp		; Print from address in esp
	call printc
	pop eax
	pop eax
	pop ecx
	ret

;;; Print the nonnegative integer stored in eax
printn:
	push edx
	push ecx
	push ebx
	push eax
	push esi
	mov ebx, 10		; Divisor
	mov esi, 0		; Digit count
printn_next:
	mov edx, 0
	idiv ebx 		; edx:eax -> remainder, quotient
	push edx		; Push remainder (digit) onto stack
	add esi, 1
	cmp eax, 0
	jnz printn_next
printn_digit:
	cmp esi, 0
	jz printn_done
	pop eax
	call printd		; Print from stack
	sub esi, 1		; Decrement count
	jmp printn_digit
printn_done:
	mov ecx, newline	; Print newline
	call printc
	pop esi
	pop eax
	pop ebx
	pop ecx
	pop edx
	ret

;;; Find the period (or zero) of the decimal fraction 1/ecx; return in eax
period:
	push ebp
	push esi
	push edx
	push ecx
	push ebx
	push eax
	mov ebp, 0		; Count of entries in "remainder" list
	mov ebx, 10		; Base 10
	mov eax, 10		; Start numerator at 10
period_test:			; Check if remainder >= divisor
	cmp eax, ecx
	jge period_divide
	imul eax, ebx		; Multiply by 10
	jmp period_test
period_divide:
	mov edx, 0		; Zero top bits of numerator for idiv
	idiv ecx
	cmp edx, 0		; Check for no remainder (i.e. no period at all)
	jz period_zero
	mov eax, edx	     	; Only care about remainder
	add ebp, 1		; Add remainder to stack of "seen" remainders
	push eax
	mov edx, 0		; Counter for loop
	mov esi, esp
period_check:			; Check if remainder has been seen before
	add esi, 4
	add edx, 1
	cmp edx, ebp		; Check if done looking
	je period_test
	cmp eax, [esi]		; Check against this item
	jne period_check
	mov eax, edx		; Match! Compute distance and return it
	jmp period_done
period_zero:
	mov eax, 0
period_done:
	;; Pop list off stack
	cmp ebp, 0
	jz period_return
	pop ebx
	sub ebp, 1
	jmp period_done
period_return:	
	pop ebx			; Not a typo; don't restore eax since it holds the result
	pop ebx
	pop ecx
	pop edx
	pop esi
	pop ebp
	ret

;;; Entry point
_start:
	mov ebx, 0		; Counter
	mov edx, 0		; Best number
	mov esi, 0		; Longest period
loop:
	add ebx, 1
	cmp ebx, 1000		; Only check < 1000
	je done
	mov ecx, ebx		; Compute period
	call period
	cmp eax, esi		; Check if better
	jg better
	jmp loop
better:
	mov esi, eax		; Update best number/length
	mov edx, ebx
	jmp loop
done:
	mov eax, edx		; Print best number
	call printn
	mov ebx, 0		; Exit with code zero
	mov eax, 1
	int 80h
