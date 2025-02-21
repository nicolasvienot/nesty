import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { AuthService } from '../auth.service';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private authService: AuthService) {
    const clientID = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const apiUrl = process.env.API_URL;

    if (!clientID || !clientSecret || !apiUrl) {
      throw new Error(
        'GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET and API_URL environment variables must be set',
      );
    }

    super({
      clientID,
      clientSecret,
      callbackURL: `${apiUrl}/auth/github/callback`,
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, displayName, emails, username } = profile;

    if (!emails || emails.length === 0) {
      throw new Error('No email provided from GitHub');
    }

    const name = displayName || username;

    if (!name) {
      throw new Error('No name provided from GitHub');
    }

    const userDto = {
      email: emails[0].value,
      name: name,
      githubId: id,
      password: null,
    };

    return await this.authService.validateOrCreateGithubUser(userDto);
  }
}
