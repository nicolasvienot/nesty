import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const apiUrl = process.env.API_URL;

    if (!clientID || !clientSecret || !apiUrl) {
      throw new Error(
        'GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and API_URL environment variables must be set',
      );
    }

    super({
      clientID,
      clientSecret,
      callbackURL: `${apiUrl}/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;

    if (!emails || emails.length === 0) {
      throw new Error('No email provided from Google');
    }

    const userDto = {
      email: emails[0].value,
      name: name?.givenName + ' ' + name?.familyName,
      googleId: id,
      password: null,
    };

    return await this.authService.validateOrCreateGoogleUser(userDto);
  }
}
