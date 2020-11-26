## [0.0.6](https://github.com/vspirit803/sora-flow-be/compare/v0.0.5...v0.0.6) (2020-11-26)


### Features

* **application-record-collection-tasks:** populate tasks field when fetching the task list ([b65964c](https://github.com/vspirit803/sora-flow-be/commit/b65964cc17904e36a5bb714fe95fef79aa8605d5))
* **auth:** return a clearer message when authorization expires ([86ac95e](https://github.com/vspirit803/sora-flow-be/commit/86ac95e452ca1a435814f322b0435de18bd790c9))
* **versions:** modify name and text of version role ([95072d8](https://github.com/vspirit803/sora-flow-be/commit/95072d8a20458251c543b22f7017343448d94e3e))


### Reverts

* Revert "build(deps-dev): bump @types/express from 4.17.8 to 4.17.9" ([842127d](https://github.com/vspirit803/sora-flow-be/commit/842127d2e23066a0b660254b5430ec32718bae04))



## [0.0.5](https://github.com/vspirit803/sora-flow-be/compare/v0.0.4...v0.0.5) (2020-11-18)


### Features

* **application:** allow modifying status of applications ([55f84c1](https://github.com/vspirit803/sora-flow-be/commit/55f84c12f08e378b036ec66e48f423af05542af0))
* **application-record-collection-tasks:** add title field ([43f489b](https://github.com/vspirit803/sora-flow-be/commit/43f489bac2ebec810ebb4294de150e10996e4c63))
* **application-record-collection-tasks:** allow to obtain detailed information of application record collection tasks by id ([d74487f](https://github.com/vspirit803/sora-flow-be/commit/d74487fddee8280c31cfd0016c0cbe79ccc663b0))
* **application-records:** automatically update the status of related tasks when creating application records ([ff55f71](https://github.com/vspirit803/sora-flow-be/commit/ff55f71a1b8fadec1c08cf8278dafb2df0d87aa6))
* **departments:** populate members of departments ([e30b38d](https://github.com/vspirit803/sora-flow-be/commit/e30b38ded7b08c3174e74798e3a02e0a80cbd38b))
* add application-record-collection-tasks module ([1c62745](https://github.com/vspirit803/sora-flow-be/commit/1c62745b4b57babf32dcdb2437ca3df3a35b4568))
* add application-record-collection-tasks module ([418a142](https://github.com/vspirit803/sora-flow-be/commit/418a142c0a4898477f9259fcc044a09fe7a5ce60))
* add tasks module ([7bf8932](https://github.com/vspirit803/sora-flow-be/commit/7bf8932b9b0a3c7c14ff5de49e350eddc8b7a2af))
* modify the validity period of the authorization to 7 days ([8942cf3](https://github.com/vspirit803/sora-flow-be/commit/8942cf32d16de5841a4c11836ecd3a4ce741f506))
* **application-record-collection-tasks:** allow update of existing application records ([eb66812](https://github.com/vspirit803/sora-flow-be/commit/eb6681251f3afe56c77cc67701b9678faa84d429))



## 0.0.4 (2020-10-16)


### Bug Fixes

* **accounts:** correct the default value of the organizations field of the new account ([98ffd5b](https://github.com/vspirit803/sora-flow-be/commit/98ffd5b5bb8e73ed88afcf67dae673eba85b4fb8))
* **operate-log:** get ip from headers ([7f3d109](https://github.com/vspirit803/sora-flow-be/commit/7f3d10980a8ebfa2364c507c951722b34f21ac16))
* **roles:** remove the menu from authorized menu list of all roles when the menu is deleting ([66ac496](https://github.com/vspirit803/sora-flow-be/commit/66ac496f7430ba63f5e943f5eec2fb01509a602d))
* delete associated role when deleting version ([5fcb06f](https://github.com/vspirit803/sora-flow-be/commit/5fcb06fa47799114368953bb1d79c3146c5c6177))
* fix bug on GET accounts/:id ([c1ae932](https://github.com/vspirit803/sora-flow-be/commit/c1ae9326058586b90737df063af6a073df1806f3))
* fix bugs on querying accounts by name ([1b8e404](https://github.com/vspirit803/sora-flow-be/commit/1b8e404dd8ec0728db102d06b6476d69c161bbe0))
* fix some error validate types ([0aa1dc1](https://github.com/vspirit803/sora-flow-be/commit/0aa1dc1060b99de15a1ed76b50da0c5a5d3f5421))
* modify validate type of some props to MongiId ([8216836](https://github.com/vspirit803/sora-flow-be/commit/8216836ee9fdd7bd5515571fec9fe2f8c99d7807))
* rename organization passport strategy ([584f56f](https://github.com/vspirit803/sora-flow-be/commit/584f56f0d8f18c2d2ed3131b8447996f4572f0bc))


### Features

* **operate-logs:** add sorting function and paging function ([42b9daa](https://github.com/vspirit803/sora-flow-be/commit/42b9daabd6bb8e2a4af53b4b9606be3eae71ac75))
* add departments module ([79b0ee6](https://github.com/vspirit803/sora-flow-be/commit/79b0ee62291b06ac795da798059ae87e4253b548))
* **application:** add form filling function and all data display function ([678f262](https://github.com/vspirit803/sora-flow-be/commit/678f262318c205ff72fdadb1f0bfd36a16d6d2ab))
* **applications:** add findOne api ([b3c2e65](https://github.com/vspirit803/sora-flow-be/commit/b3c2e65b695255426e7382d16994da1c3261a9ae))
* **applications:** add organization id filter when getting application list ([7d67182](https://github.com/vspirit803/sora-flow-be/commit/7d67182436b147bb602968836cfeedf92d7cdf6d))
* **applications:** add populate fields ([8053f6b](https://github.com/vspirit803/sora-flow-be/commit/8053f6bae9ae342f4cf6744d6bd269d879beb295))
* **operate-log:** add a new decorator to override the operation name set in the class ([bca5d05](https://github.com/vspirit803/sora-flow-be/commit/bca5d05e346c2a75596dc3c0898990dcb21b089c))
* **pipes:** validate id when meta type is "param" and name is "id" ([a407064](https://github.com/vspirit803/sora-flow-be/commit/a407064516d3f331bf908bbb76f8eae872bd548e))
* add accounts manage ([91d19c8](https://github.com/vspirit803/sora-flow-be/commit/91d19c85fd109e8debb998d4b864efa86bcda795))
* add applications module ([4349da7](https://github.com/vspirit803/sora-flow-be/commit/4349da721d23c41d2b0e78c762ba977ecae7d55a))
* add authorizedOperations field to menu ([d99e4a6](https://github.com/vspirit803/sora-flow-be/commit/d99e4a600c575be414b2e6800e1be5fd2b1bc74a))
* add created time and updated time to ([179b466](https://github.com/vspirit803/sora-flow-be/commit/179b4664ee45dc37db6e3d993321dd82f789fd79))
* add delete and update account ([0d5d4c1](https://github.com/vspirit803/sora-flow-be/commit/0d5d4c19546b02a9159b3ec8b2f2c658e44a6c6d))
* add delete and update role ([64979ea](https://github.com/vspirit803/sora-flow-be/commit/64979ea3bae1fb5523f65cccf901e7f859ad8c2e))
* add leave organization ([c06d0ea](https://github.com/vspirit803/sora-flow-be/commit/c06d0ea150266f007d9f088c8729233c9fb85ec8))
* add logger interceptor ([f3a1c32](https://github.com/vspirit803/sora-flow-be/commit/f3a1c327ac3cb25580e49868f26c1d57d78c7649))
* add menu module ([33bacfc](https://github.com/vspirit803/sora-flow-be/commit/33bacfc479555c0ddf7cf0633d4512c886999042))
* add menu order ([949da7f](https://github.com/vspirit803/sora-flow-be/commit/949da7f4487f1a51a710e30aefed1b6092235650))
* add more infomation to jwt ([56cf42a](https://github.com/vspirit803/sora-flow-be/commit/56cf42ac500a4df423dd74483971620d74c28994))
* add nickname field to account ([71c8241](https://github.com/vspirit803/sora-flow-be/commit/71c824190f54fec8fa4bb0bfff0b58b6c7cd5d67))
* add operate log ([08860eb](https://github.com/vspirit803/sora-flow-be/commit/08860ebc57576c5ca8a53c6e88fe3c85f688840c))
* add operate log to account module ([053294b](https://github.com/vspirit803/sora-flow-be/commit/053294b13377e406c71cd31dc880a0d4d862e872))
* add organization auth ([968ecd5](https://github.com/vspirit803/sora-flow-be/commit/968ecd529e64f3d0d17a372ee5662197f1aafcb7))
* add organizationRoleMap field to account ([0876788](https://github.com/vspirit803/sora-flow-be/commit/08767885a6f148410f134021f2d9b9579ba031b6))
* add organizations field to account ([9e20c89](https://github.com/vspirit803/sora-flow-be/commit/9e20c89bb64a6d7b8dacf88e6c909e61c1eaffa3))
* add property "roleId" to account ([1804afd](https://github.com/vspirit803/sora-flow-be/commit/1804afd95f48c669c4f4838485a1c32facd497b9))
* add README ([a8d0936](https://github.com/vspirit803/sora-flow-be/commit/a8d09362d52ef6dbf14da15bdd72f07cd6a60f25))
* add Role module ([086013d](https://github.com/vspirit803/sora-flow-be/commit/086013de68e9de7b61d0f4274189036ca50895b3))
* add roleId field to CreateAccountDto ([d67f178](https://github.com/vspirit803/sora-flow-be/commit/d67f17893be29bcf70fdf44a92391177fa874c74))
* add swagger ([fc9b627](https://github.com/vspirit803/sora-flow-be/commit/fc9b62719f43701d489f3392dc97fba061bc1557))
* add todo ([8a9846a](https://github.com/vspirit803/sora-flow-be/commit/8a9846a7d75ba03bd29d8878fea6828590342bd5))
* add versions module ([7c614aa](https://github.com/vspirit803/sora-flow-be/commit/7c614aa8a8e2ba97e6130bc97dd7833a86364ddb))
* distinguish between modifying accounts and organization members ([ebb4571](https://github.com/vspirit803/sora-flow-be/commit/ebb45716cc5a23ea1e4ccfa35ae6a26806750b6c))
* enable cors ([4306889](https://github.com/vspirit803/sora-flow-be/commit/430688991cad7e57ea610c013171de193f4cb4ba))
* forbid deleting an account when it supervise any organizations ([5b865a6](https://github.com/vspirit803/sora-flow-be/commit/5b865a6d783e8e70c7224e8bdf3ed474c848d151))
* improve details of organization management ([9205903](https://github.com/vspirit803/sora-flow-be/commit/920590342f8624aa8234284fe028b24c373ed922))
* let supervisor join the new organization then creating an organization ([ecde13e](https://github.com/vspirit803/sora-flow-be/commit/ecde13e1512f46e7fe4ca08910214b3b5c7f2d38))
* update todo list ([12a1fd4](https://github.com/vspirit803/sora-flow-be/commit/12a1fd4f7c9d5eafdd5f883d111a453a99572752))
* **account:** remove organizationRoleMap field, ([b59cd15](https://github.com/vspirit803/sora-flow-be/commit/b59cd1594208054704d94a3c7fd3b414b51ea855))
* **account:** remove roleId and roleName field ([8fd3802](https://github.com/vspirit803/sora-flow-be/commit/8fd38022a9dd5994a493ae500027b0f4158ff3b8))
* **menu:** modify menu module ([f285203](https://github.com/vspirit803/sora-flow-be/commit/f285203268b11b317712633e855fa6c24b0f2204))
* **profile:** add profile module ([7fb1596](https://github.com/vspirit803/sora-flow-be/commit/7fb15969fc94506008712113f4fa29d759474211))
* **profile:** add route for getting organization ([0656d30](https://github.com/vspirit803/sora-flow-be/commit/0656d30add1701dbe01a844b9b471b874bb1db8f))
* **profile:** add route profile/organizations ([8a774f7](https://github.com/vspirit803/sora-flow-be/commit/8a774f7cc20086e077ce3fcea8934df224ea9a87))
* **role:** add organizationId field to role ([17762c4](https://github.com/vspirit803/sora-flow-be/commit/17762c414461caad103ea3f8e6bd7df458318bd1))
* **role:** add type field to role ([6140312](https://github.com/vspirit803/sora-flow-be/commit/6140312f04e3e2a98dac3324410ca5c08ae27659))
* **role:** change authorizedOperations to ([07a5a75](https://github.com/vspirit803/sora-flow-be/commit/07a5a7569b5a6eda6c1049f025772c1a405d9d4b))
* **role:** modify roles module ([45882d6](https://github.com/vspirit803/sora-flow-be/commit/45882d65a5d5732e4d930d790bb0a412c300d985))
* **version:** associate version to role ([f8e13f7](https://github.com/vspirit803/sora-flow-be/commit/f8e13f70b14183ea2a2ba0e3a7e680a0b834f5f5))
* add organizations module ([3d48da7](https://github.com/vspirit803/sora-flow-be/commit/3d48da710f089779b1d83770520e5fc3b5a364f4))
* change login verifying method ([cda2f5e](https://github.com/vspirit803/sora-flow-be/commit/cda2f5eccc7a2c29295a625b6d418499ec4783b6))
* make some props optional ([7c6c00f](https://github.com/vspirit803/sora-flow-be/commit/7c6c00f3c1be66849ee5e593d378e17594a14ab3))
* modify jwt authorization, ([d4ee592](https://github.com/vspirit803/sora-flow-be/commit/d4ee592f551fdfc666de4db06b530ddb6f02a876))
* move dto files to dto directory ([0121430](https://github.com/vspirit803/sora-flow-be/commit/01214308b7e022244f635a9ff7609469331727aa))
* remove unnecessary code ([1e9bf97](https://github.com/vspirit803/sora-flow-be/commit/1e9bf9700059b1a5e99e247f7dd08412e5ebbdbc))
* rename PatchAccountDto to UpdateAccountDto ([8af48cd](https://github.com/vspirit803/sora-flow-be/commit/8af48cd9764542a66de04155744302137cc6b2a1))
* replace role with roleName in GET accounts ([fd42cfb](https://github.com/vspirit803/sora-flow-be/commit/fd42cfb3b26e8c19218ff86fb45b28a770a552c0))
* restrict menu type to directory or item ([395bf76](https://github.com/vspirit803/sora-flow-be/commit/395bf76be42c4b8b6cb2a05365e58e2c4f7a5ab0))
* use ExcludeUndefined pipe to exclude ([8b23220](https://github.com/vspirit803/sora-flow-be/commit/8b23220c0c9a009aad109395f50e7ec8de3cab69))
* use id field instead of _id to locate record, ([eac150b](https://github.com/vspirit803/sora-flow-be/commit/eac150bccc00a9d1950c6cb7a14e243fc8507203))
* use remote database ([1e13220](https://github.com/vspirit803/sora-flow-be/commit/1e1322024c63f26c9737fca4fe1c04a8c315c2bb))



