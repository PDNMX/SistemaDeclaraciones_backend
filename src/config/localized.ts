import LocalizedStrings from 'localized-strings';


export const strings = new LocalizedStrings({
  es: {
    subjectRecoveryEmail: 'Recuperación de Contraseña',
    textRecoveryEmail: 'Para recuperar tu contraseña por favor usa el siguiente enlace: {url}?token={token}',
    subjectDeclarationFile: 'Acuse de Declaración Presentada',
    textDeclarationFile: `Recuerda que la primera página del documento digital que obtienes al finalizar
    tu declaración en el sistema constituye el Acuse de declaración y es la única parte del documento que
    deberás presentar con la autoridad competente para la recepción de las declaraciones en tu organización
    (por ejemplo, el Órgano Interno de Control).

    Toda la información que aparece posterior al Acuse de declaración es personal y servirá para que puedas
    tener constancia de lo que reportaste a través de tu declaración patrimonial y de intereses.
    `,
  },
});
