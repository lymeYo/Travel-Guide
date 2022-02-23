import axios from 'axios'
import { createClient } from 'pexels';
import { API_KEY_IMAGES, requestError, API_KEY_SPOTT, API_TOKEN_HOTELS, API_KEY_SIGHTS } from './constants'

const temporaryImgSrc = `
   data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoGBxETExYTEhMWFhYZGhsaGRkaGB8cGhkaGhkZGhocGhoaHysiGxwpHRoaJDYjKCwuMTExHCE5PDcwOyswMi4BCwsLDw4PHRERHTApIikyMDMyMC4wMzMzMDAwMDAwMDIwMDAwMDAwMjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMP/AABEIALABHgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAEDBQYCB//EAD8QAAIBAwIFAQYEBAUDAwUAAAECEQADIRIxBAUiQVETBjJhcYGRUqGxwRQjQvAHYnKC0UOSsiQzohU0wuHx/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QALBEAAgICAgEDAgQHAAAAAAAAAAECEQMhEjFBBCJRE2FxkaHhI0KBsdHw8f/aAAwDAQACEQMRAD8Aw/IeAt3FuO7Iqi2+WullJGQGQQ5OMAbxUnD8s4c27dx3Cq7BRFm4qyTsHJP6Vjw1WnKLDuOm/aQqQypcfRqYSRGqE3xlhvVqQf1NnzL2WKWw8YIOkg+ojDv6dwAE4GbTifw+7nI8Vw3TqwR+INrX6OMqf9Qq2se3HG2nu275DqxYOnSAGzlCuBnIjHcUZy6zZ4wXPTurrRSf5o9O4VAkkXbY0wPDrB7mnafQlaMNcGf7/auam4pYYjwfEfkMfbFQ1BQqVKnoAalT0qAGpU9KgBqVPSoAalT0qBjUqelQIalT0qAGpU9KgBqVKlQAqVKlQA1KnpUANSp6agBUqVKgBU1PSoAalSpUAKtN7JC4bdwIt8rqGopwicRbGP6w+2PFZqtB7N8OoBLrY1YK+peuWLsESDbeRbjvLA0IRV8Wyeux6dGs+4pVY1f0q2VEdu1aT/EbhuDD2r/BafTuh50QFDW30wEGU6dJ+Mg+azfM59W5q1TqadVwXGmTvcUQ5/zDBoQ1alSaoTjtOya6WhQZiCVkdiex7iQfzqKjOLPRZE7K2NTGJdj7rCFJ/wAsqcd5oSoKGpU9GcJwytZvuZlAmnP4ngz5xTBsCp6VKkMVKulWSB5pqAGpU9KgBqVPSoAalT0qAGpU9KgBqanpUANSp6VADU1dU1ADUqelQIalSpUAKmp6VADUqemoAVKlSoAQNan2Se8UfT/EESoJThE4m2ABA16zK47DtWWNX3s1btEMXWwSCNJuX3s3Bj+hgdH1I3oQir5iR6tyNMa2jSmgbnZD7o/y9qFNE8xYm7cJkks27i4dzvcGH/1Dfeo+HQFgDt/qC9vxMIH1oAK415t2RqmEIj1C2nrbGkj+X5gSDMjc0HRnGuSlkaiYQgdYfT1tgKADb86TO8jehKBjUZw6fybx0sY9PqDQFlj7yz1T28UJRvB8vL2btzVGg2xp/FqLD8o/OmkDAqeunSKagZLwKE3EAEkusDz1DFQgUXylVN62HnTrGqBJAnJAO8b/AEqC+Opsg9RyNjk5EYinQEcUqeKUUqAalTxSooBqVPFKKKAalTxSooBqaK7H7eJ/X9aaKAOaVdRTRQBzSrqmpANTV1TUANSp6VAHNKnpUCGpUqVADUqelQAiau+Q8wW2jK110DHYcLavq2Iz6riPkAap7yAMQJgEjIg4Pcdj8KKtczcWhaJBRXDaCognvLCGjAxPmmq8ku/BBxrA3HKkEFmIIUICCTEIMJ/pG21QGpuEs62C9WT/AELrb6LIn71PzfgfRuFAXOAepCjZ7FGyKQzrjG6LOZi2f60aOtjsuV/0vn6EULRPEvK25dW6NgACvW3S5ABY95M4IziKHplDVYcDwzMmsRpVgGz+LVEDvsaAo7g7DFVYCQrQTIxqmO89jVRGgfiB+tRVb8LwfDvbum5dK3Rq9NY6WgSJc4EnEVUAUeRteQ7kIPr24uLaMnraIWVIJM42/Wn4Pk1+8zLYs3LxQwRaRrkZIBOgHBg5pcotoXOtgBofTImX0woAgySaO9m/ariuXPcPDlFZxpbWoaNJJGDsQSaH0SBcz5HxPD6f4ixds650+ohSY3jUKAIr35/8SOU8bZvWXYKdLaU4hAFZgp0wTKzq7GDNeCCktj0yOKUV3FKKdAcRSiu9NLTRQHEUXyewr3kVhIOqR8kY/qKg00dyBf8A1Fv/AHf+DU0hPo0nJfYheJFxlV1CsF1LlRJEgzOYM1R+03s4eFaPU1g+Vgj8zNGNzA8PevOrMjNauorKSGDFgVIIyMjett/j8uOEPco0nucpvQ66oW7PI4pV0RTRSoZzFNFdRSilQHNNXUUqQHMU1dRSpAc0qemoAamrqmoAalT01Aju6pBIJBIJEgyCfII3+dRk1JBUkEQRIII27EEGu106Mnq1DEbKBvM+Tt8KBDcNGoatMT/Vq0/XR1faiedx6mCh6VjQbhWCJEer1jEYPmly5wCBqKnWMhgjAeRcO3yj41N7RKfV1Fy5hfeuref3ZzcQANG30pgV9vauq5tDFSaaaRR09mATP5VYcBct+kZB1al04BiNevqiVBlcUDc2NPZHSKd7HRLdGCYMeY70MtFXsf3/AMmh7aQI/veqfYEnDqZ1ATp6vsRv8K55heL3XcqFLMWIEwCcmJ+NG8svKpKOVVLmlHYiWVNQJ0SwGrHfx2oPmBQ3GNsykkKSIJAwCRJj71LAS8MCJDd4gjeADuNpMxPYU0VIiQm+zGZgZCYGd86xHyroKhjTO3c9+8RuKEEVaZDpp9NWX/0e96Iv+m3pE6Q8dJbwD5oa1YkgYEmM4H1J2q3BoSkn0DaaWmrC/wAvdCFIksFYAdWGEjb4dqHNuk40NU+gfRR/IV/n2/8Ad/4NUItVYcktFbocbqrMD4IU5yY+9FUOiLm7W2d1J6tgZwJ+HffzVz/iB7ajmS2P5QtG2Csepr1Tpz7qx7u2d6ruK4ZCXPpgxGY32He0fPk1RXBbOnQpDE5l5iD8VG4pNk2IrXJWijaqM26KLoHK0xFTFK5K0iaIYpRUhWmIooDimroimilQjmKaK7impAc01dRTRSA5pU9KgQgpIJ8b/p+tSXGTSAF6sEtqntkR8812AIZYODiQBiT72d/hnvUTIRmDvG2JjzQBJwAJcBVlpH9Ifv8AgbBovnyH1oZGQwuHspY7ZPpp0gE96G4TaDp06h7wbSTtEp1TBOKK51btreAKoF0pIteoBEdvXGqfy2+NMRHY4QlAykNgkqDlYIEsDtMjaa74ThdRjUqZA6jG8mdvh+Y81BauFANsjP3J7/Kp/wCLuOXKlVBBLdKqAB1ATspJUARvt3ihNo1uOiK6og/Xt+mM01mdMdpn9c7Gp7mnScDPfuNp+lR8PkAb9vO37UxeQi6u3/7/AGqBLcD6x+Z80feszpxP0Hw8ioOPtgIIHcme/fsPia0kiUyO8FFonq161iIjTD6pMzJx27GgipgE/T6YqUPkCegkErJ079576Sc53qz5kg9Kw0CDbMZJiXYwfkCorN9jOW4UjXqu4QgBwpI0takZJBAhUUCoL2tY1NqMAiCG3ExPnyPNGJw2tLziVhdi5xCwRJ944G/wqtsLKL8z+hqrfyNVv5LEFyETUY30zjbxU9ngST7sjc9ukbyewjvVjcti3dttaT1CLQMaVYFvSacAkEDvMHBwKkvX73EaEUJbIR50Wx1B2CnUdSiBBAPaYrS32yFXSILr2ypFovbFpSVgqZaZ99VDx1+d1qq4tRpJ7mdiIGfrNHcXy1UACNqBVjqgqDE9pO22/aoeH4PVI7TkT2GSPhiiTscFxGWwN8x+cVe8JzFDZZVt25VHtBtAnSys2piSZclTkbAnauW5bcW2HAGmWEyuQsgjOSJ/X409rgNNm7cg7YjESr/n4+tLinp9D5uO12VPFXwNanSMZ2z7pjFwdx4H/NAjg3EhFBLrBlj/AFAZDMR+VX/HOc4+WGOJj8H71UW7sX7cogC3EOwGzA5PYRUSS2Sm2WVzgD4od+EPiri9ztiWbSmkzJgb/aSZ8eaKF+21vWoB/wBQVQGG4ADsT8iomRnYE2aX8mUexUZsmtGiIxDAKZJBh0aPBAXJxnbzXXEcFbU56cd1iBsZ6j5GcfvVA2jLG1XBt1qLXKrbHDKQcyNQBA3I6CRHfenvez2kScyCQNQEROSXVZ22AopE2ZQpXJStDd5MIGmTPbSGJPbTG8x/faG/yJ12n5FYI+cExRxFZRlK5K1bjluD1pqBjTDyRuTOiIGxzPzqK5yt/KfLVHeP6oj60uIFYVpoqwbldyYGk/J1jHxmP/4aiu8vuKJK48yM/LOaTgxWgOKaKIXhmO0efeX9zSHCtJHTI3l0H5ls1PEYNaaCNvrUxaBoKkENOSY2g9Pn40uK4kszEEkMzGSBqOoz1EbnaokJJ+wmpEF8ruhXWVHvAyWKkQdtUwB9JxVn7VMrOzM516belTcN/UsHPqiBHwg/maqOFTqI3IP4Q/melt6sOf2T6wFz1FGlAS1tEKgz/wBK2dKiNlmfvT8CAuItaQszJBkHcZI/amjpOl/eA1IAQN5iTgwQK646/ItmI6O5J2JBMneSCfrUNu+0kiJ/v94+1Isluvg5/v71xZvEDBINI623/Kf+ajdNOKoDS3lhU+XifHxqTjLa/wAMgKKNRceowPTBLASCTqOmB07H6hXbjKlsqY6Rn/aB4NPa4Y+hduOwA0goh/6rBgp0iYMKTn4R3g9E2kzGKbX4Gd4lQFBzPfxHw70TxHLfS0+owGtFdSmhpnBB0viGBGc4mKi4q6VBtlUgkGdILCYMBtwPl5NFc3uW2YFTa91cIjIRAwGCoFLREkT85rHyaUyVh03FF4OMdQTDQMTryI8+T8aGS0PTEGQSIMEQfTM4+Z/Kib3BpDherTIBQNpMAEk6hJ8f7flK4UL6NtpnrM42Hpknv8DSKRecDxVm27lwbgIYKJcFfeUTp+f1ipr/AA1m3dAvPeX+WmnRbXIOWJDnG2I+AxUtvhuXMfTZrYbVqMu2stEkCSFH+mYnviufanmrK4tqDDW5/wDdD4hhgjIGPdmli9UufHjv7l5PTe3kpfkH8wsWRwtt7YZiBdhm0hjqeVYKMKQBELT2eALldK6g66dMZtTIEiBG587VInEm3Zsu1tXRVhkMBgbpGhgGw4EjBEAGe2bnlt2/dZf5bIZGdSgAD4qsHxWPqPV8HXEvD6a43YX7OeyQfSb7ef5YJImSSSY7Yx+tS+3ljh7PCvaRADiTECJJM7Tudq0XBWDZtyqqxJO+ryO+md/NYz/Ei4x4W4iaTccqAs9QDElj1QZ0z3PbFRD1FyV+RPHpteDzHmXGqvUpVsgEYkH44mPjQtlxc4lRccaS/UQRB7xrA2JxOd654nlt4APp1apkQZG2+r+8VDw2u1dtubWrS6tpPusFYEqwyIMQa7JzvpHPFfc0HN04dbuu3ctG3p9zUzHsk4jq3YCcfqVwtjhYLNxHDk4bSC4JgbNqQquSJO2+8CrS97ELftfxHB3itm4pY2iWD4Y4YZViNonMb5rK8fyS7wze8JG5kMsGfeEbGDjOxFZQzxldf8NpYmn3+5b8Lwlh7qaGRPVJ0y2lAFBEFicSfhHaat73ssQkmwzjAS7auKbeotn3RMR9cTPesw/P7t99Fy7agoE9R0ClVXYIUt9J7YUk95FAcFzW/wAJd1W3uJpbqVGKK0dmAjyQZE57VpyshxaNBxXB8MNK3NdosAxZgdIxt0JMmQNjGMmTA1zhrQYCzesusErrcyIAnDqJbVO31G9E8u9vA+leYW7d9JALAFbirB20CDmPH1qZeccsDSjspLSZDssSTpkJtJwY7DNaY6cqbInpaRU3+XXVMPbu6o06Qk9sbNnf+9qHPFKTI1KRAIGqDG8y5Pit9f8Aabk9y+tzWBaCoCgtspLDbGDvme0DerC4OUcQ/qW+I6yNKxcCNsAAWbqPjMwJHirnxT7Ii5NdGH5eTdUF795ROG9J3XaYGnVHn61Pb5JeBh2tMsiNa2wTnabkQDnZu3zreta4Lg7Qa9cuhjEaCHOkkD+ldsxVfxPOOXXUb0br+ogM+pawqx1dJG8bD4jvVRUX0yJSku1RiOK4NbMepwurBEq6sDncGyx0EeDPcfKnD2GP/t3FUaZ0yT4OYx3iR2rX2rfAC7c9bjLgBaPdKjSUUlsMJOs6dJnau+KPJdX8rivT1YM2tSY7lpXJMxv9hSaXz+hSm/gxFq3qfJaJAMgk99y0RtsfIoPibo7O0yZHugDtsYnetWv8CGYNxaaTMkWyxIBAOnT5EwCJ/wBVC3W5WYVOJuIOoknhgdo0gQcggnsIKnyKwa+Wa39jJrcaCO0adhtqn6Z70rUyIOx/fE1Jxt4OxYgicnaSSSScY3qOzgx53rMA3l40rcYlRkIZ6hDBydjnKjI/SivaNzq0glbehDC23toSNWjpdiSI1Qx+Piq3hHIY5IkH+rT2Pft/Y70fzviiC6K66XCatDs4YrqjW7iWbO69NV4JrYFxyR6WZBQEGABuZAjwZBPcg03AIpJnx5Udx3NRXZi3O2nGdhqaflmT9aK5Vc0vONu5A3geCZ+WaUeygjhrqrqM5BTR3HvLqyR4bvXHPipdNAgaF+pHvHsDJ7jHy2ri7cY3Izhwe+5CTvnsKbmw6h8s+dzvLE/fNW3pkpbsvryj07R76RH2X4z9q5XmZsaSLluQfdbUWXOSFC5nO/eDRw4Im1ZIEyin5jSvbvWf596qMbY1aGCkiDBILR84q8irsUX4QZxnIeIuxfKgpc6ywIUKGycXGSTJbG0jfNVvFx06ljByNyJnIPcTv+tC2A0jSpJnsvV9DGMd6M5taCspX3SgIO8jOfmNtu1ZI0Nr7DXPSs3bhRT/ACnGkKHuL0CHMrABDbzVDytP5FmZKtdkj5WiP0/WrbkPDE27+pshWAI6kHQsouqAsRGMREVWctj0bA1CQ+djvaPb8qmLbbLaSoi5pze+/EXEQBSCUB0iVCmAQSMEgD9oNW/sT7Lrdv21cFwWU3CP6EI6jn5gTTcj5Ncv3oRQzeo7XD2A6gTqOTmIPetPzDjFtaOE5edN1li9dYBvTSQskqYMEwB3YgTvKlLVoaikwr2kt2L3Eizw6gJa0h7gkHUIIsrJgnpRidwAB/VWt5NwwFtVYYyex/EZmMDE1U8o9lv4Ygagw7GSWE+8S0wWZoJPdnnEADQXb5t21UsozkDsADMfUV5+RuU3KXS/U3VKCjHyR8bzE6tOrpAliJz8AB3rC+39xHsC6Cwc3CrAggEemSCM9QAgT5n62XPOYstxbOmCRqbMeMf5QIGc5nzWV9quPNxNMzBnBxswEL4wc/E+aMEpSzJNfsVkxqONtGR4NLRtBbnv6SZYpAHUcs+ZxAFVd33isgFXAlSCDmMFTBxJmtRyjh7Q4Z7ly46dNwKALxVnAaATa6Rk/wBQ+dZdDrCmRgp0gbCQP3/WvUkqZ50JWjaexftS1hxw95tFskm25UwCwOkTtpLg5iRnOKK9rfZq4rk3FtJ6gBDkHSzz0ifwsJJYLggdpNZNOWrcuwXZJdQSOwOCfmK9G9mOY27tscuuMGNoAICQbjowJIUuNLZgaSfG0VzS9OoSeSPf9zshn5exnnnGez7LOogEAluh1QDGdZWP+6PrgkW1ZvKjaRrtssPpOCoAaGI7KQrR/lHavQ/aDiS8WP4f1Ldp4tnQf5anYXAFLSAO2B27VYXOVWuI4UJwyW7V0khrYfRbYsoDatcF57jeO9UsvJpJCeNx3Jnkrendwq6CuwLysQSQJjv48neo7tmD/MBEwdUHbPaBPjtkV6AvsO1kWhcALs51+gVuM1vTOQIC5AM98YFN7TewV6zZa9bN28jWpVVSXtuCo6wQ3RpL+6Qc+Aa1UGzKU4qrPPGskkBCGJnbcAbfGokuEdt8Z+G/12oixxQVkJkQ3UQBqiclTiDH5jeig9phpKrKyQzaR6gnPUAerYbnucbUrkmD4/IHb4+4k+lcdRAEavuMYiScVPa5y3UHUNqABKsUbBB7dPYf09hUNzI1dGot7uCc5mN96iu6gTqAEDuB2EAR9hRbDXyWXFXeGcQt24pA2ZSVJ397JOTOVH70LZ4ckRqBWZMaioxhmCyR3HuzQ9ssx93WAOwGBk7xgSZqUuAAbZ6gTsWDA46lECAQB3P5UXIXtfZ3xfCOzYGosAYRtYECI1bSANhOO9C3rRBMgKRHSfrkfb86O4nmXFFdT69JPUxQdRGIdoGo74J7nzUL8aoYnQh7AgMsj/SjAD+8nej8SXXgg4hHcG4VAUYnYbnYn3jvtXHC25uKpO7ASM7xXf8AC9DXNaAhiNGqH+YWNv8Aiu+VmL1uNi6zPddYOfsKFtgztbei6ygkxqXG+J84q19orF1zqIJACKWa7bfTLMF1NbhLeT7vwJ7GKy5DPcPSSTOVJOQxMRj5/ltRXtGzDQhUr06gDaSzue1tMgY95sn7VXyTukCc24fQLP8AmtK3iZd8jyMb0uWnqOe34j5H4RqPyFdc3cn0RkabaAAmYEB8fAliQPjRHs8im7DSVIMgMQSMGNvhRDcinpMXL1UX21pqAUnSRpzpBEgmRnyag50sFPGkx437QoX/ALcfE0dxrKLl3QoQNcthVXIACGYIyP3+lCe0V0s4J3zOIO87bj6x8hVy0miY29m/5Xxarw1oEt1WreBHVCDcnsPkfpWZ51y9r/FQztbXQOrSzSQSdCRA1QZgkCATO0n8O82LGf8Apr/4AV01i5ce3aUqWJaNiR0EnT8DjPmPlTyT5aHCFbIV5RZibav0xhn1PcBcLJxgkHZRAnvvWd5qrQmpdHRgSCZOSTnEztjEY3rdcv5JxPDOEtcZwhuGcOtzViJ1RbkASMnG1YHmhONQ7uuoe6QuldKzmFz9xWdqtF+dm04JnNq6FUhY3UMX0m1bYAAjpw0k/ECcUByy0vpWLaBAWugicEnQ6qCWO0zA+Naj2B5He41Xa7rIDFHuMxwVUBktqchu34QB3NGc84PheV2E9SyjXySti0jMxYsWAEnqIUMRMT1GMtWM3ei4S4sr7d1+Ds+i1v8A9Tcd1t27dzNwuJ1kjK2wCCSSMCMZiT2Q5QpmSWOr+Y5lTcujV0jBlEA1QcxJ3NC8v4YS1zirpPE31Gpgsi2pYaUtkHAGmDGDOMCTpOC4D00OhQNIkkA5G437n7QBXnZszvjHfyd0caq5Gk4pcW7SMJiSx31Hv+tDcwtFWlevSC57SEHSM4y0b9poLh3u3Stx5E9K47DLH6DHzIqLmfGnRdKkfhE7GBEn4EkAH5+KzWTk9rX+AWOvOwG9zO063FuW1e5dZkV5IYHwOwAJXvuTVH7W8rNoBrmFL6AxIBgKf6ogAQDnuTXXIOMI4u1agMwGZzpYzcc5UwROmQRsKF/xW41rVixbKgs1y6WMmAQqAx3zrn6GvS9PFcbfZw5ZPk0nox/M0tDC3JB267R3+IjEzVfw9lJEMdwfeTscT1UFcYELBzBBEbZJGe+9K3dKggd8HAOxBxO2QMj9zXQ5WZxSWix4vj3W7qQ7FWHzX9q65fzNxeS6SdSsCDJwQZFVJuGpEbBMgR2O5zGP1qZbVFQdSs9R4rmti/bZxPrs+oFTG+dLA4ZZJGdjSu+0ti5Yf1PUtsh93V1HI3aJXbOI3iDisJyu/eBVgpKSJwTIMyfGI/StTzPk1xwb9m4rErDK3vCILAT3xg7xI3GfP4/SntnqKUckNIrOC57essbyuNOdWk5XcLqMYGozjfUfNbD2U9vuPvG56a2biImso7FCqD3mLgNPmdIrzkNcsktbZgplWAOwIIKnyCJpzw7KfW4XVpAGq2CSwGNQYDLWyRn7HsT6cJqSs8vLjlF0P7X80S/xVy9bsizqKnTg9WkSwMCQTnbvPeqdr7ZzvuOxzNaTgz66N6lpCzGFZj6dpSttUA1/jgaoke786z3GcO1tjbciVMYYMPoRgj5U5KtroxjK9PsmHG2yD/LCv0kMGOCDLR4kfOu24jCgMqhABMKWMzPUqBiAIEMexI8B7XG3mtsuSAMmAdyABBHk/nQYyQDA7ZO3x+FJoE+y2ezw5UvqktAjUmoNGYAOR/t+xzVW1tJbJAg6ZXJPYEaun55+tWKcgb0rd+QLbyupuzAgHSFMkiZzRfF8I1pS72rPEWQ5i4GKkkgLDBGU9huu/fenxb7RKmk6TKROMuKQT1xtr6h+Zqz4LjeXemBd4e4H7styQ2/Yjp32+FVHF3JJgKo7BdWkfAaiT9zUaXWXKkg7YPao5Uy2rQ7PLSf/AIgL8MQIqbh2X1EIBABQn5jTq+5k/WlxyBSIAX4Ayw+Z2qKxuP770Lsqg4OAHnTkrvMjSGGNOQMxPeief2LcI9spDAwFS4pYaj1arkl/iSRnAEU9rgCyX7vum3oYHVpZgzqkCcASwMnxFF81sLduK1sl1W3/ADHLG4y/F2HRgEDSmBI71S22gekim4959OdwiCfOAB+QA+lF8vtNJwdvDn8mhfuYqPmwU3LZTVpZEjUM4hMgQP6e1WtjhWRSxQwI3tso38s5T71MflFfzbK7jLzF1J2WACDv33EA7kYxjG00PzbdPEGPEY2iF/7cfE1NzDiTreRIbR5wQBBEjxOYqLmr6mB+c+e2/fxvn4CqtsGkXqcWVs2Y/Ao/+IqPhfaK7w9xbiadazDFQcEEEScxn8h4oK5fi0gnsP0qXl3IL/EL61tkVQ0CWEgrBmJnuKvi5aStilOMFcnosH/xA4prjXZTUSCCUB0wCOgfUnJOfpFNduG+4NzSoIgtpjAIlp2nET86Lb2TvpJuXLFtQocMz4Zc5BQNG0Q0E9hVO103IVVgfDufJn9KylFrRUJxls2tv29uWLA4Tls20mXvFQHZiFU+msQgIXcyxJJ6ak4S29tv4u+xvXTb0IbrszKWmCNRnYnv5jeq32W5ESdbiEXJPyreez9m3fBZlwTElZiNhEYMdvjXDny0uMNnbjxJe6RSck4NnlwM9OkdurC4HkTHhQx8Vv8AjeKFu2lskF3IU/aDH6VJyn2ct2wp9QsdRYysST8AcQAAPl8TXHMvZg3CWF4DELKkgT73fJIkfWsljrG6W2KWeMpq3pEPH8xDgW7fgIvy8j5n9KxftHzy3bAt5Kl4MblFjUfGSfvWn4jk9yyJFxXMYwfr96w3M+CQ3Ab6uQqkdE9bElsztknbtFY4YNt8kze4KPtYT7B3D/FPfuLkK7mATJuFdMZ3bWYEDt9KD/Fzjb1zjAtxpVLa6APdBYAvGYmcSNwq1Z8f7RmygFi2benScqeqJBJmBIWFEfE96H58tri4vuu9sMFkgoTHTI94QVz5mvVxRlXRwZVFdGEtpMAbkxVjzLl1uyQBdF0ESGUMvcggq4BBBHjOKIPKrZICiCcDqMUJx3LrykljMn8U/n3rTi0zIBcCYFdcOTMBgNXSSdgCRvg47/SufTbxXSWTuZFAqC7HMr1v+UlzpB7QQfiCRMfCtDe59d0JbvIqyvQ9vBIOVYw5WJ8CR8Kyfo/GtHxCWFtraKliJ0tryrbHBmQTmMfSoeKMk7RcMs8bVMlFq+tpymzhWu2yPeUGVdZHuycxsfhtUes9sh7ZYAEx5UnBB+mPiK2Xs6y8Rw78K7KLtr/7W6BAYEsSrTnM7N5+BqmtcpnUzLBQ6blvuN/gcA7NWCvG9nZayx12B2rPrWzou3EcsH9MCLexAeJEHcSAYnxtVcy4F7Lql1GRtIYqyxhsgrnqUrBnHcdqPYtYcNZYgjq+KMMCSP2+dafh+P5Zx1h7fGubPEkakvSSAwOwXYKQcicxODXXCSnE4MkJY5U1owpvlCVVpXG2zdwSPO2OxrQ8Nzblj2CvEWLguCNLWtIMQRJJw0GMEfKNqi9q/ZEcKqXLF9OJtMDLrA0kaRkBjAJYRNCcRyI2yge3eDEkaGCrIUSwDjVpIBU5WIJ8ZtOS0YtRdM7t8fwYMKl8RlW9W3p27obG+SNz9ag5xy8olu6ji7acdLSCynulwDKsBG+84ND3uCXUxUOqjMFSxAhSJaFB97eB281ALDhSROnuQenvv4ODAOT2qZN9MpJdkIWujK9hUtxDqm6GBbuAJ3g4874xTuCNvoSCAQCRt8/3qaKsfmUdMREHAGB8j/VS5VZ13bS4Euoztl1GfAzXfMzOg5ODmIBiPdXtUPDuViDGQDmP6gY+4FHkpl3xNm4Dctm4WW2AoXJBBdVhVJgjUZzjE1cjjjLIxCo3DMpQlSRA9S30pi0NQJC6ixOTIgVnruou07dAg9Uy6Yge93wKtuIRgg1YHoyBoVN2QdNv3szlySW7bUnKm39zWMFpFLdtlikgyIDT5nx222+c1o+P4H07F1igWNGfStJH8wj3kuMB/wBvyztR8u5pd4dGCxD6QZUHYdj56jVxzXmJuW7kkFiFE6rJMC4YzbAf7D85rSMVxRlJvmZXjmJePr/cmfvmpb9ktEDb++w/T7neuLzgE4zEDxvmY2+X3Jq75JcsixxHqR6ha1okjYi5qw0ScL3nIx4cIpypkyk0m0Ul4kwviAKt+T8c1u2Oq2hW4GXUoJcQqsCMal6YOcme+QRyHl03BfuKfS1Qnm44A6U+Akam2E/GK59r1QudTr6pgaUXoRQNvG0bd/rRz4P7lPH9SP2I/bH2mPGXNFpRbsKZCqoXU34mA+cD4UV7I+z/AKk3H6baQXY7CZj6mPyqm5Olv1F6GuZ2AA1HsPgO5NargnuNc03LbInvBIhCe0eR9K5vUz9jbezo9LiSkkkaUWw5Fu2pWz3YjLx4HZcfnVd/BJc4lRZNw6JElmOphuxMGQNvj9RXPOOeemht2/fI62H9CnH0J2qX2e4gWUBPvsJj8K9h9Zn7V5EHNJzWl/uz0pRXT2zY8o5CAvVevamkkhtp8CP7+tUntFyu4ru6cbxXZQPVhekAMYUASY37matuF5tpt9J6m6U//Jv2+vwqr5pxvg4H6Dv9cmlL1E3SRljwe9t9FdxvrBfTXibuu2vWxbVL6SxyT5JHzUeazzc04tXtheIcAW9TgHDGHIb4atIJA21DeiuP41iInru3APzDMfuU+xqps8crfxVyPeKW0+Cgk/8AjbH3rrxTmk6Y8mODkk0E8/us/CB2ZmdnLsSRBwUUxvMLuas/aPhbVu3bCAhvRUP4IlCp+eWX/aKE4hbFyyOH9cC4ApYuGgYJCDSCY6p8dXzql57zq4Z86UQDsQpFen6dv6bcvnX5HneprmlHx2VY4gi9DOwUASQZgwMjfNWyc24Msvr2jdUb+nc0FhEbEHM5kEd8ZxSFj6+DB8+MCrb+H4NrZ9XiCt7VubR06dJn3NUnVA7YJPwoMyv5hZR3ZuGtXha7BxrI+GpFiKDvI6YeVMTpKkH4YNWXBe1PHcMptcPxVxLcmApgZ3MEYoXmfPOKviL957gE4Y4kmdhjfNIAJHJFS8yJF64Adrjgf9xqGydvial4pGd2cj3mLY+JJp+BMm4Tmt20ykNGkg9ONvlitRyvnD+sbr6dTKDIOHUxO+CdpHn5YxbWG8H7H/irLlTCVt3AFGsEXCGAXBGSO23bsKxy4ucWmbYMzhJFnzW6nqEYhpjMAqSSBPYf+J+Bqn4nhGA1ASNsjI+BIxWibkZu2DctsLioSLoUy1o9ng7oRvFD8Jwa/wDtXQRqICsSdO4K6o97E6TnBYRIxFfTSOh/xbRmWuH9t6ccW4jO232j9KN53wN2w5R9u0RBHbbtVaWraM7Vo4pw4umEfxtyCNRzj7gKfyAFcjirgQprbQcFZOk51bbb5+dQ10LsTAGRB+4P6gVXJk0iW5xtxmLO7MzABiSSSBESe/ur9hRF7nFx1VH0sELlQwwC5BYgDuSJ+9VxNODRyYqR/9k=
`

class ApiProcessing {
   cache: any
   isFirstEntry: boolean

   constructor() {
      this.cache = {
         queries: {}
      }
      this.isFirstEntry = true
   }

   private async getSpottData(query: string) {
      try {
         const getOptions = (type: string, q = query) => ({
            method: 'GET',
            url: 'https://spott.p.rapidapi.com/places/autocomplete',
            params: { limit: '1', skip: '0', language: ' ru', q, type: 'CITY', },
            headers: {
               'x-rapidapi-host': 'spott.p.rapidapi.com',
               'x-rapidapi-key': API_KEY_SPOTT
            }
         })

         let cityOpt: any = getOptions('CITY')
         let cityRes = await axios.request(cityOpt)

         let countryOpt: any = getOptions('COUNTRY', 'россия')
         let countryRes = await axios.request(countryOpt)

         return cityRes.data[0]
      } catch (e) {
         console.log(e)
      }
   }

   private async getImageData(query: string) {
      // const client = createClient(API_KEY_IMAGES);
      //TODO не видит process переменную
      // let res = await client.photos.search({ query, per_page: 1 })
      // console.log(client)
   }

   private async getHotelData(query: string) {
      const resForLocationId: any = await axios.get(`http://engine.hotellook.com/api/v2/lookup.json?query=${query}&lang=ru&lookFor=both&limit=1`)

      let locationId = resForLocationId.data.results.locations[0].id

      const res: any = await axios.get(`http://engine.hotellook.com/api/v2/static/hotels.json?locationId=${locationId}&token=${API_TOKEN_HOTELS}`)

      const limit = '10' //лимит на получаемые Отели
      const hotels = res.data.hotels.slice(0, limit)

      return hotels
   }

   private async getSightsData(query: string) {
      //возвращает достопримечательности для запрашиваемой страницы
      console.log(query)

      let geoname = await axios.get(`https://api.opentripmap.com/0.1/ru/places/geoname?name=${query}&apikey=${API_KEY_SIGHTS}`)

      let coords = {
         lat: geoname.data.lat,
         lon: geoname.data.lon,
      }

      let radiusMetrs = '10000'
      let limitData = '5'

      let radius = await axios.get(`https://api.opentripmap.com/0.1/ru/places/radius?radius=${radiusMetrs}&lon=${coords.lon}&lat=${coords.lat}&limit=${limitData}&apikey=${API_KEY_SIGHTS}`)

      let packCoordsXID = radius.data.features.map((item: any) => item.properties.xid)
      console.log(packCoordsXID, 'packCoordsXID')

      const packSights = []

      for (let xid of packCoordsXID) {
         let sight = await axios.get(`https://api.opentripmap.com/0.1/ru/places/xid/${xid}?apikey=${API_KEY_SIGHTS}`)

         packSights.push(sight.data)
      }

      return packSights
   }

   private async getLocationsData(query: string) {

      try {
         const res: any = await axios.get(`http://engine.hotellook.com/api/v2/lookup.json?query=${query}&lang=ru&lookFor=both&limit=8`)

         let results = [{
            country: res.data.results.locations[0].countryName,
            city: res.data.results.locations[0].cityName,
            imageSrc: temporaryImgSrc, //TODO перенести в getImageData
         }] //если запрос города, товозвращаю город

         if (query.toLowerCase() == res.data.results.locations[0].countryName.toLowerCase()) {
            results = res.data.results.locations.map((data: any) => ({
               country: data.countryName,
               city: data.cityName,
               imageSrc: temporaryImgSrc, //TODO перенести в getImageData
            })) //если запрос страны, а не города, товозвращаю топ 5 городов этой страны
         }

         return results
      } catch (e) {
         console.log(e)
         let errorInfo: requestError = {
            message: 'error',
            code: 402
         }

         return errorInfo
      }
   }

   public async checkValidQuery(query: string) {
      if (this.cache.queries[query]) return true

      let res: object[] | requestError = await this.getLocationsData(query)

      if ('message' in res) return false

      this.cache.queries[query] = res
      return true
   }

   public async getPreviewData(query: string) { //возвращает данные для карточки
      if (this.cache.queries[query]) return this.cache.queries[query]

      if (await this.checkValidQuery(query)) return this.cache.queries[query]

      let errorInfo: requestError = {
         message: 'Недействительный запрос', // !вывод сообщения в UI
         code: 402,
      }

      // const imageRes = await this.getImageData(query) //TODO переместить интеграцию imageSrc в этот метод

      return errorInfo
   }

   public async getCityPageData(city: string) {
      const sights = await this.getSightsData(city)

      const { country, imageSrc } = (await this.getPreviewData(city))[0]
      const hotels = await this.getHotelData(city)


      return ({
         sights,
         country,
         imageSrc,
         hotels,
         city,
      })
   }
}

export default new ApiProcessing()
