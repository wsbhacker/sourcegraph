package db

import (
	"fmt"
	"testing"
)

func TestExternalServices_ValidateConfig(t *testing.T) {
	for _, tc := range []struct {
		kind   string
		desc   string
		ext    externalServices
		config string
		err    string
	}{
		{
			kind:   "AWSCODECOMMIT",
			desc:   "without region, accessKeyID, secretAccessKey",
			config: `{}`,
			err:    `region: region is required; accessKeyID: accessKeyID is required; secretAccessKey: secretAccessKey is required; `,
		},
		{
			kind:   "AWSCODECOMMIT",
			desc:   "invalid region",
			config: `{"region": "foo", "accessKeyID": "bar", "secretAccessKey": "baz"}`,
			err:    `region: region must be one of the following: "ap-northeast-1", "ap-northeast-2", "ap-south-1", "ap-southeast-1", "ap-southeast-2", "ca-central-1", "eu-central-1", "eu-west-1", "eu-west-2", "eu-west-3", "sa-east-1", "us-east-1", "us-east-2", "us-west-1", "us-west-2"; `,
		},
		{
			kind:   "AWSCODECOMMIT",
			desc:   "valid",
			config: `{"region": "eu-west-2", "accessKeyID": "bar", "secretAccessKey": "baz"}`,
			err:    ``,
		},
		{
			kind:   "BITBUCKETSERVER",
			desc:   "without url",
			config: `{}`,
			err:    ``,
		},
		{
			kind:   "PHABRICATOR",
			desc:   "without repos nor token",
			config: `{}`,
			err:    `(root): Must validate at least one schema (anyOf); token: token is required; `,
		},
		{
			kind:   "PHABRICATOR",
			desc:   "with empty repos",
			config: `{"repos": []}`,
			err:    `repos: Array must have at least 1 items; `,
		},
		{
			kind:   "PHABRICATOR",
			desc:   "with repos",
			config: `{"repos": [{"path": "gitolite/my/repo", "callsign": "MUX"}]}`,
			err:    `<nil>`,
		},
		{
			kind:   "PHABRICATOR",
			desc:   "with token",
			config: `{"token": "a given token"}`,
			err:    `<nil>`,
		},
		{
			kind:   "OTHER",
			desc:   "without url nor repos array",
			config: `{}`,
			err:    `required "repos" property is empty`,
		},
		{
			kind:   "OTHER",
			desc:   "without URL but with null repos array",
			config: `{"repos": null}`,
			err:    `required "repos" property is empty`,
		},
		{
			kind:   "OTHER",
			desc:   "without URL but with empty repos array",
			config: `{"repos": []}`,
			err:    `required "repos" property is empty`,
		},
		{
			kind:   "OTHER",
			desc:   "without URL and empty repo array item",
			config: `{"repos": [""]}`,
			err:    `invalid empty repos[0]`,
		},
		{
			kind:   "OTHER",
			desc:   "without URL and invalid repo array item",
			config: `{"repos": ["https://github.com/%%%%malformed"]}`,
			err:    `failed to parse repos[0]="https://github.com/%%%%malformed" with url="": parse https://github.com/%%%%malformed: invalid URL escape "%%%"`,
		},
		{
			kind:   "OTHER",
			desc:   "without URL and invalid scheme in repo array item",
			config: `{"repos": ["badscheme://github.com/my/repo"]}`,
			err:    `failed to parse repos[0]="badscheme://github.com/my/repo" with url="". scheme "badscheme" not one of git, http, https or ssh`,
		},
		{
			kind:   "OTHER",
			desc:   "without URL and valid repos",
			config: `{"repos": ["http://git.hub/repo", "https://git.hub/repo", "git://user@hub.com:3233/repo.git/", "ssh://user@hub.com/repo.git/"]}`,
			err:    "<nil>",
		},
		{
			kind:   "OTHER",
			desc:   "with URL but null repos array",
			config: `{"url": "http://github.com/", "repos": null}`,
			err:    `required "repos" property is empty`,
		},
		{
			kind:   "OTHER",
			desc:   "with URL but empty repos array",
			config: `{"url": "http://github.com/", "repos": []}`,
			err:    `required "repos" property is empty`,
		},
		{
			kind:   "OTHER",
			desc:   "with URL and empty repo array item",
			config: `{"url": "http://github.com/", "repos": [""]}`,
			err:    `invalid empty repos[0]`,
		},
		{
			kind:   "OTHER",
			desc:   "with URL and invalid repo array item",
			config: `{"url": "https://github.com/", "repos": ["foo/%%%%malformed"]}`,
			err:    `failed to parse repos[0]="foo/%%%%malformed" with url="https://github.com/": parse foo/%%%%malformed: invalid URL escape "%%%"`,
		},
		{
			kind:   "OTHER",
			desc:   "with invalid scheme URL",
			config: `{"url": "badscheme://github.com/", "repos": ["my/repo"]}`,
			err:    `failed to parse repos[0]="my/repo" with url="badscheme://github.com/". scheme "badscheme" not one of git, http, https or ssh`,
		},
		{
			kind:   "OTHER",
			desc:   "with URL and valid repos",
			config: `{"url": "https://github.com/", "repos": ["foo/", "bar", "/baz", "bam.git"]}`,
			err:    "<nil>",
		},
	} {
		tc := tc
		t.Run(tc.kind+"/"+tc.desc, func(t *testing.T) {
			t.Parallel()

			err := tc.ext.validateConfig(tc.kind, tc.config)
			if have, want := fmt.Sprint(err), tc.err; have != want {
				t.Errorf("validateConfig(%q, %s):\nhave: %s\nwant: %s", tc.kind, tc.config, have, want)
			}
		})
	}
}
