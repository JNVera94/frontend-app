import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth_token = inject(TokenStorageService);
  const dialogService = inject(DialogService);

  if (auth_token.getToken()) {
    return true;
  } else {
    dialogService.openFailureDialog('Debe iniciar sesión primero').afterClosed().subscribe(() => {
      window.location.href = '/login';
    });
    return false;
  }
};